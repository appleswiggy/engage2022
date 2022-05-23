import pandas as pd
import numpy as np
from collections import defaultdict
from .search_spotify import find_song
from scipy.spatial.distance import cdist
from joblib import load

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


def get_song_data(song, spotify_data):
    try:
        song_data = spotify_data[
            (spotify_data["name"] == song["name"])
            & (spotify_data["year"] == song["year"])
        ].iloc[0]
        return song_data

    except IndexError:
        print("Finding song in Spotify.")
        return find_song(song["name"], song["year"])


def get_mean_vector(song_list, spotify_data):
    song_vectors = []

    for song in song_list:
        song_data = get_song_data(song, spotify_data)
        if song_data is None:
            print(
                "Warning: {} does not exist in Spotify or in database".format(
                    song["name"]
                )
            )
            continue
        song_vector = song_data[number_cols].values
        song_vectors.append(song_vector)

    song_matrix = np.array(list(song_vectors))
    return np.mean(song_matrix, axis=0)


# this function is probably not needed.
def flatten_dict_list(dict_list):

    flattened_dict = defaultdict()
    for key in dict_list[0].keys():
        flattened_dict[key] = []

    for dictionary in dict_list:
        for key, value in dictionary.items():
            flattened_dict[key].append(value)

    return flattened_dict


def recommend_songs(song_list, spotify_data, n_songs=10):
    metadata_cols = ["name", "year", "artists", "explicit", "id", "release_date"]
    # {'name': ['Come ...', 'Smells ...', 'Lithium', ...], 'year': [1991, 1991, 1992, ...]}
    song_dict = flatten_dict_list(song_list)

    song_center = get_mean_vector(song_list, spotify_data)

    scaled_song_center = scaler.transform(song_center.reshape(1, -1))
    distances = cdist(scaled_song_center, scaled_data, "cosine")
    index = list(np.argsort(distances)[:, :n_songs][0])

    rec_songs = spotify_data.iloc[index]
    rec_songs = rec_songs[~rec_songs["name"].isin(song_dict["name"])]

    return rec_songs[metadata_cols].to_dict(orient="records")


playlist = [{"name": "Shape of You", "year": 2017}]
# playlist = [
#     {"name": "One Less Lonely Girl", "year": 2009},
#     {"name": "Sorry", "year": 2015},
#     {"name": "Yummy", "year": 2020},
#     {"name": "Boyfriend", "year": 2012},
#     {"name": "What Do You Mean?", "year": 2015},
# ]


recommended_songs = recommend_songs(playlist, data)


def generate_HTML(songs):
    path = "recommendations.html"
    with open(path, "w") as f:
        f.write("<html><body>")
        for song in songs:
            f.write(
                '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/{}" width="300" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>'.format(
                    song["id"]
                )
            )
        f.write("</html></body>")

    return path


print(recommended_songs)
print("\nHTML generated at: {}".format(generate_HTML(recommended_songs)))
