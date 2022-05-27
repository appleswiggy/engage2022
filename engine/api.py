from urllib import request
from flask import Flask
from flask import request, jsonify

from engine import (
    recommend_songs_from_playlist,
    recommend_songs_from_multiple,
    recommend_songs_from_single,
)

app = Flask(__name__)


@app.route("/single", methods=["POST"])
def single():
    id = str(request.get_json().get("track_id"))
    n_songs = int(request.get_json().get("n_songs"))

    songs = recommend_songs_from_single(id, n_songs)
    return jsonify(songs)


@app.route("/multi", methods=["POST"])
def multiple():
    ids = request.get_json().get("track_ids")
    n_songs = int(request.get_json().get("n_songs"))

    songs = recommend_songs_from_multiple(ids, n_songs)
    return jsonify(songs)


@app.route("/playlist", methods=["POST"])
def playlist():
    playlist_link = str(request.get_json().get("playlist_link"))
    n_songs = int(request.get_json().get("n_songs"))

    songs = recommend_songs_from_playlist(playlist_link, n_songs)
    return jsonify(songs)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
