import search_spotify

import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
from joblib import load
import warnings

warnings.filterwarnings("ignore")

# Features of song used to create song vector.
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
    """Generates a mean vector from multiple vectors by calculating
        mean along column axis.

    Parameters:
        songs_data (list of pandas dataframe): List of songs features.

    Returns:
        mean_vector (numpy array): Mean of all vectors calculated along the column axis.
    """

    if len(songs_data) == 0:
        return songs_data

    song_vectors = []

    for song_data in songs_data:
        song_vector = song_data[number_cols].values
        song_vectors.append(song_vector)

    song_matrix = np.array(list(song_vectors))

    return np.mean(song_matrix, axis=0)


def get_songs_data(song_list):
    """Returns the features of each song in the input list.

    Parameters:
        song_list (list): List of song IDs (Spotify track IDs)

    Returns:
        songs_data (list): Song data including audio features.
    """

    songs_data = []

    for song_id in song_list:
        to_append = None
        try:
            to_append = data[data["id"] == song_id].iloc[0]
        except IndexError:
            # If song is not in the dataset, get its details using spotify API
            to_append = search_spotify.find_song(song_id=song_id)

        if to_append.empty:
            print("Warning: {} does not exist in Spotify and in data".format(song_id))
            continue
        else:
            songs_data.append(to_append)

    return songs_data


def recommend_songs_from_multiple(song_list, n_songs=10, isPlaylist=False):
    """Finds songs similar to the list of songs provided.

    Parameters:
        song_list (list): List of Spotify track IDs
        n_songs (int): Number of songs to return
        isPlaylist (boolean): Whether the songs supplied are from a playlist.

    Returns:
        rec_songs (list): List of recommended songs (includes ID, name, artists and image).
    """

    """
    Reason for inclusion of isPlaylist variable:
        In case a user wants to get songs similar to his playlist, we need to make
        sure that the recommended songs don't contain the songs already in his playlist.

        In the other case, we are recommending songs to user he might also like, so
        recommending songs which may contain some of the songs user has already listened
        is not a concern.
    """

    songs_data = get_songs_data(song_list)
    song_center = get_mean_vector(songs_data)

    if len(song_center) == 0:
        return []

    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, "cosine")

    # Sort the distances to find the top (n*2) similar songs
    index = list(np.argsort(distances, kind="quicksort")[:, : n_songs * 2][0])
    rec_songs = data.iloc[index]

    if isPlaylist:
        rec_songs = rec_songs[~rec_songs["id"].isin(song_list)]

    # Return first n songs
    rec_songs = rec_songs[:n_songs]

    return rec_songs[["id", "name", "artists", "img"]].to_dict(orient="records")


def recommend_songs_from_single(song_id, n_songs=10):
    """Finds songs similar to given song.

    Parameters:
        song_id (str): Spotify track ID of the song
        n_songs (int): Number of songs to return

    Returns:
        rec_songs (list): List of recommended songs (includes ID, name, artists and image).
    """

    try:
        song_data = data[data["id"] == song_id].iloc[0]
    except IndexError:
        # If song is not in the dataset, get its details using spotify API
        song_data = search_spotify.find_song(song_id=song_id)

    if song_data.empty:
        print("Warning: {} does not exist in Spotify and in data.".format(song_id))
        return []

    song_vector = np.array(song_data[number_cols].values)
    scaled_song_vector = scaler.transform(song_vector.reshape(1, -1))
    distances = cdist(scaled_song_vector, scaled_data, "cosine")

    # Sort the distances to find the top (n+1) similar songs
    index = list(np.argsort(distances, kind="quicksort")[:, : n_songs + 1][0])

    # Return last n songs as the first song
    # will be same as the one provided.
    rec_songs = data.iloc[index][1:]

    return rec_songs[["id", "name", "artists", "img"]].to_dict(orient="records")


def recommend_songs_from_playlist(playlist_link, n_songs=10):
    """Finds songs similar to the songs in the given playlist link.

    Parameters:
        playlist_link (str): Spotify playlist link
        n_songs (int): Number of songs to return

    Returns:
        rec_songs (list): List of recommended songs (includes ID, name, artists and image).
    """

    # Get the track ids of songs in the playlist using Spotify API
    tracks = search_spotify.tracks_from_playlist(playlist_link)

    if len(tracks) != 0:
        return recommend_songs_from_multiple(tracks, n_songs=n_songs, isPlaylist=True)

    return []
