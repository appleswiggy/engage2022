import os
import pandas as pd
from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from collections import defaultdict

load_dotenv()

sp = spotipy.Spotify(
    auth_manager=SpotifyClientCredentials(
        client_id=os.environ["SPOTIFY_CLIENT_ID"],
        client_secret=os.environ["SPOTIFY_CLIENT_SECRET"],
    )
)


def find_song(song_id):
    song_data = defaultdict()
    try:
        result = sp.track(song_id)
    except:
        return pd.DataFrame({})

    audio_features = sp.audio_features(song_id)[0]

    try:
        year = int(result["album"]["release_date"][:4])
    except ValueError:
        return pd.DataFrame({})

    song_data["name"] = [result["name"]]
    song_data["year"] = [year]
    song_data["explicit"] = [int(result["explicit"])]
    song_data["duration_ms"] = [result["duration_ms"]]
    song_data["popularity"] = [result["popularity"]]

    for key, value in audio_features.items():
        song_data[key] = value

    return pd.DataFrame(song_data)
