# Musify - Spotify song recommendation system
The engine works by comparing the audio features of the songs.

The audio features of the songs include:
* **valence** - Measures how positive a track sounds, from 1 (extremely positive) to 0 (extremely negative).
* **year** - Year in which the song was released.
* **acousticness** - Confidence measure of whether a track is acoustic.
* **danceability** - How suitable a track is for dancing.
* **duration_ms** - Duration of a track, in milliseconds (ms).
* **energy** - How intense and active a track is.
* **explicit** - Whether the song is explicit or not.
* **instrumentalness** - Proportion of instrumental parts in a track.
* **key** - Overall key of the track.
* **liveness** - Detects live audience in a track. Represents the probability that a track was performed live.
* **loudness** - Overall loudness of the track, in decibels (dB).
* **mode** - Whether the track is in major mode (1) or minor (0).
* **popularity** - Current popularity score of the song.
* **speechiness** - Proportion of spoken words in the track.
* **tempo** - Overall tempo of a track, in beats per minute (BPM).

Vectors of all the songs are created by using the numerical values of these audio features. Cosine distance is then calculated between the vectors, the less the distance between two vectors are, the similar they are based on their audio features.

**Note:** You need to set up some environment variables in the .env file in the root directory of the project and in the .env.local file in the `web/` subdirectory of the project.

## Installation
**Note:** Python 3.10 has an issue with project's dependencies, please use Python 3.9
* Git clone the repository to your local system and open it in terminal/cmd.
* Change the directory to engine: `cd engine/`.
* Install Python dependencies: `pip install -r requirements.txt` or `python -m pip install -r requirements.txt`.
* Start the Flask API server: `python api.py`.
* Open the repository in another instance of terminal/cmd.
* Change the directory to web: `cd web/`.
* Install next: `yarn add next` or `npm install next`.
* Create production build: `yarn run build` or `npm run build`.
* Start the production server: `yarn run start` or `npm run start`.
* Go to the URL shown to you in the output of above command.

**Note: You need to run both flask server at engine/api.py and the next js server at web/**

The engine exposes three API endpoints: `/single`, `/multi` and `/playlist`.
`/single` is used to find songs similar to a given single song which is used in the web application to list `You might also like ...` column when the user play that song.
`/multi` is used to find songs similar to user's last 15 recently played songs. They are shown in the `explore` tab of the sidebar in the web application.
`/playlist` is used to find songs similar to the ones in the user given Spotify playlist link.

The web application built on the top of the engine also includes a search tab in the sidebar which uses MongoDB Atlas search to provide seamless search among all the songs in the dataset. The web application also supports Google login authentication linked to MongoDB.

The detailed explanation of the working of the project can be found at: https://docs.google.com/document/d/1Jj_l6_ycqQLvsVtgNls-UIUYU9ORDPDi96XEjz-lIk0/edit?usp=sharing

## Screenshots
![image](https://user-images.githubusercontent.com/66782780/170877734-5f1489ba-c478-4430-8979-8d09ea3216af.png)
![image](https://user-images.githubusercontent.com/66782780/170877774-d49a91ee-c7c3-4196-946e-eee494f52973.png)
![image](https://user-images.githubusercontent.com/66782780/170877816-f2f13490-d367-4e93-8bab-ecd1009dc640.png)
![image](https://user-images.githubusercontent.com/66782780/170877896-bd25b9fe-073b-4ef9-9d1a-70f0e63d2cd1.png)
![image](https://user-images.githubusercontent.com/66782780/170877967-c7f3a0e5-860d-4549-9047-b87e135214de.png)
![image](https://user-images.githubusercontent.com/66782780/170878038-82dd1741-dfca-4ca2-8971-4b397504dbca.png)
![image](https://user-images.githubusercontent.com/66782780/170878055-86404a5a-5f9e-4335-810f-e9301019dade.png)
![image](https://user-images.githubusercontent.com/66782780/170878083-2b4ea8db-8c61-4f7a-8d75-83567d118ef0.png)
![image](https://user-images.githubusercontent.com/66782780/170878103-8b29471c-789a-4513-81e1-d040110cde27.png)
