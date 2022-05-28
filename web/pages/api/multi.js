/**
 * This API route provides the functionality to add a song to the list of
 * recently played songs of the current user, to retrieve the list of 
 * recently played songs and to get recommendations similar to the recently
 * played songs.
 * 
 * Since, the task of retrieving details of recently played songs and the 
 * task of getting recommendations both require Spotify song ID of each 
 * song in the list of recently played songs, a single function can be 
 * used to serve both tasks.
 */


const { connectToDatabase } = require('../../util/mongodb');
const axios = require('axios');

axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401);
        res.end()
        return;
    }

    if (req.method == 'PUT') {
        // To add song id in user's recently played list.
        return updateRecentlyPlayed(req, res, session.user.email);
    }
    if (req.method == 'GET') {
        if (req.query._recommend) {
            return getRecommendations(req, res, session.user.email);
        }
        return getRecents(req, res, session.user.email);
    }
}

async function updateRecentlyPlayed(req, res, _email) {
    try {
        let { db } = await connectToDatabase();
        const data = JSON.parse(req.body);

        // remove the song id from the list of recently_played
        await db.collection('users').updateOne(
            {
                email: _email
            },
            { $pull: { recently_played: data['id'] } }
        );

        // push the song id at the end of the list
        await db.collection('users').updateOne(
            {
                email: _email
            },
            {
                $push: { recently_played: data['id'] }
            }
        );

        return res.json({
            message: 'Song added successfully',
            success: true,
        });

    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function getRecentIds(_email) {
    try {
        let { db } = await connectToDatabase();

        // get the IDs of last 15 recently played songs.
        let results = await db
            .collection('users')
            .find({
                email: _email
            }, {
                projection: {
                    recently_played: {$slice: -15},
                    image: 0,
                    name: 0,
                    _id: 0,
                    email: 0,
                    emailVerified: 0,
                }

            })
            .toArray();

        return results[0]['recently_played'];

    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getRecents(req, res, _email) {
    try {
        let { db } = await connectToDatabase();
        let songIds = await getRecentIds(_email);
        
        // get the song data from song IDs in the same order.
        let songs = await db
            .collection('Songs')
            .aggregate([
                {$match: {id: {$in: songIds}}},
                {$addFields: {"__order": {$indexOfArray: [songIds, "$id"]}}},
                {$sort: {"__order": -1}}
            ])
            .toArray();
        
        return res.json({
            message: JSON.parse(JSON.stringify(songs)),
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function getRecommendations(req, res, _email) {
    try {
        let songIds = await getRecentIds(_email);

        // Makes a post request to Flask server.
        const songs = await axios.post('/multi', {track_ids: songIds, n_songs: req.query._n_songs})

        return res.json({
            message: JSON.parse(JSON.stringify(songs['data'])),
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}