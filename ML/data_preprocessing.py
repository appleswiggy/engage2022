"""
    This code is used to get the image URLs of all the songs in 
    the data.csv file from the Spotify API and store them in 
    data_w_img.csv file.

    This is done to provide faster access to users while serving
    them in frontend. Since, image is already in the dataset and need 
    not be fetched every time from the Spotify API, response time is
    greatly reduced.
"""

import os
import pandas as pd
import threading
import spotipy
from dotenv import load_dotenv
from datetime import datetime
from spotipy.oauth2 import SpotifyClientCredentials


# loads env variables from .env
load_dotenv()

sp = spotipy.Spotify(
    auth_manager=SpotifyClientCredentials(
        client_id=os.environ["SPOTIFY_CLIENT_ID"],
        client_secret=os.environ["SPOTIFY_CLIENT_SECRET"],
    )
)

df = pd.read_csv("../data/data.csv")


def thread_function(id, start, end):
    """Gets the images of the tracks using SPOTIFY API

    Parameters:
        id (int): Thread ID
        start (int): Index value to start from.
        end (int): Index value to end at.
    """
    for i in range(start, end):
        try:
            track = sp.track(df.loc[i, "id"])
            df.loc[i, "img"] = track["album"]["images"][0]["url"]
        except:
            print("Error occured at Track: {}".format(i))
            continue
    print("Thread: {} finished.".format(id))


length = len(df)
size = length // 10  # Divide the workload to 10 threads

thread1 = threading.Thread(
    target=thread_function,
    args=(
        1,  # thread ID
        0,  # start index
        size,  # end index
    ),
)
thread2 = threading.Thread(
    target=thread_function,
    args=(
        2,
        1 * size,
        2 * size,
    ),
)
thread3 = threading.Thread(
    target=thread_function,
    args=(
        3,
        2 * size,
        3 * size,
    ),
)
thread4 = threading.Thread(
    target=thread_function,
    args=(
        4,
        3 * size,
        4 * size,
    ),
)
thread5 = threading.Thread(
    target=thread_function,
    args=(
        5,
        4 * size,
        5 * size,
    ),
)
thread6 = threading.Thread(
    target=thread_function,
    args=(
        6,
        5 * size,
        6 * size,
    ),
)
thread7 = threading.Thread(
    target=thread_function,
    args=(
        7,
        6 * size,
        7 * size,
    ),
)
thread8 = threading.Thread(
    target=thread_function,
    args=(
        8,
        7 * size,
        8 * size,
    ),
)
thread9 = threading.Thread(
    target=thread_function,
    args=(
        9,
        8 * size,
        9 * size,
    ),
)
thread10 = threading.Thread(
    target=thread_function,
    args=(
        10,
        9 * size,
        length,
    ),
)

now = datetime.now()
current_time = now.strftime("%H:%M:%S")
print("Start Time =", current_time)

thread1.start()
thread2.start()
thread3.start()
thread4.start()
thread5.start()
thread6.start()
thread7.start()
thread8.start()
thread9.start()
thread10.start()

# Wait for each thread to finish.
thread1.join()
thread2.join()
thread3.join()
thread4.join()
thread5.join()
thread6.join()
thread7.join()
thread8.join()
thread9.join()
thread10.join()

now = datetime.now()
current_time = now.strftime("%H:%M:%S")
print("End Time =", current_time)

df.to_csv("../data/data_w_img.csv", index=False)
print("CSV WRITTEN")
