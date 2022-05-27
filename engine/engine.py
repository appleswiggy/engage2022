from search_spotify import find_song, tracks_from_playlist

import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
from joblib import load
import warnings

warnings.filterwarnings("ignore")

number_cols = [
    "valence",
    "year",
    "acousticness",
    "danceability",
    "duration_ms",
    "energy",
    "explicit",
    "instrumentalness",
    "key",
    "liveness",
    "loudness",
    "mode",
    "popularity",
    "speechiness",
    "tempo",
]

scaler = load("../data/std_scaler.bin")
data = pd.read_csv("../data/song_data.csv")
scaled_data = scaler.transform(data[number_cols])


def get_mean_vector(songs_data):
    if len(songs_data) == 0:
        return songs_data

    song_vectors = []

    for song_data in songs_data:
        song_vector = song_data[number_cols].values
        song_vectors.append(song_vector)

    song_matrix = np.array(list(song_vectors))
    return np.mean(song_matrix, axis=0)


def get_songs_data(song_list):
    songs_data = []

    for song_id in song_list:
        to_append = None

        try:
            to_append = data[data["id"] == song_id].iloc[0]
        except IndexError:
            to_append = find_song(song_id=song_id)

        if to_append.empty:
            print("Warning: {} does not exist in Spotify and in data".format(song_id))
            continue
        else:
            songs_data.append(to_append)

    return songs_data


def recommend_songs_from_multiple(song_list, n_songs=10, isPlaylist=False):
    songs_data = get_songs_data(song_list)
    song_center = get_mean_vector(songs_data)

    if len(song_center) == 0:
        return []

    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, "cosine")
    index = list(np.argsort(distances)[:, : n_songs * 2][0])

    rec_songs = data.iloc[index]

    if isPlaylist:
        rec_songs = rec_songs[~rec_songs["id"].isin(song_list)]

    rec_songs = rec_songs[:n_songs]

    return rec_songs[["id", "name", "artists", "img"]].to_dict(orient="records")


def recommend_songs_from_single(song_id, n_songs=10):
    try:
        song_data = data[data["id"] == song_id].iloc[0]
    except IndexError:
        song_data = find_song(song_id=song_id)

    if song_data.empty:
        print("Warning: {} does not exist in Spotify and in data.".format(song_id))
        return []

    song_vector = np.array(song_data[number_cols].values)
    scaled_song_vector = scaler.transform(song_vector.reshape(1, -1))
    distances = cdist(scaled_song_vector, scaled_data, "cosine")
    index = list(np.argsort(distances)[:, : n_songs + 1][0])

    rec_songs = data.iloc[index][1:]

    return rec_songs[["id", "name", "artists", "img"]].to_dict(orient="records")


def recommend_songs_from_playlist(playlist_link, n_songs=10):
    tracks = tracks_from_playlist(playlist_link)

    if len(tracks) != 0:
        return recommend_songs_from_multiple(tracks, n_songs=n_songs, isPlaylist=True)

    return []
