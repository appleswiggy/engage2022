"""
    This flask API is used as a means of communication between
    recommendation engine written in Python with Javascript on
    the backend. The JS backend calls this API to get songs to
    recommend to the users based on their request.
"""

from urllib import request
from flask import Flask
from flask import request, jsonify

from engine import (
    recommend_songs_from_playlist,
    recommend_songs_from_multiple,
    recommend_songs_from_single,
)

app = Flask(__name__)

# Returns songs similar to the provided songs.
@app.route("/single", methods=["POST"])
def single():
    id = str(request.get_json().get("track_id"))
    n_songs = int(request.get_json().get("n_songs"))

    songs = recommend_songs_from_single(id, n_songs)
    return jsonify(songs)


# Returns songs similar to the list of provided songs.
@app.route("/multi", methods=["POST"])
def multiple():
    ids = request.get_json().get("track_ids")
    n_songs = int(request.get_json().get("n_songs"))

    songs = recommend_songs_from_multiple(ids, n_songs)
    return jsonify(songs)


# Returns songs similar to the songs in the provided playlist.
@app.route("/playlist", methods=["POST"])
def playlist():
    playlist_link = str(request.get_json().get("playlist_link"))
    n_songs = int(request.get_json().get("n_songs"))

    songs = recommend_songs_from_playlist(playlist_link, n_songs)
    return jsonify(songs)


if __name__ == "__main__":
    app.run(port=5000)
