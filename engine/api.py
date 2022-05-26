from engine import recommend_songs_from_multiple, recommend_songs_from_single

from urllib import request
from flask import Flask
from flask import request, jsonify

app = Flask(__name__)


@app.route("/single", methods=["POST"])
def single():
    songs = recommend_songs_from_single(str(request.get_json().get("track_id")))
    return jsonify(songs)


@app.route("/multi", methods=["POST"])
def multiple():
    songs = recommend_songs_from_multiple(request.get_json().get("track_ids"))
    return jsonify(songs)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
