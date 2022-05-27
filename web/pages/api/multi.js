// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../util/mongodb');
const axios = require('axios');

export default async function handler(req, res) {
    if (req.method == 'PUT') {
        return updateRecentlyPlayed(req, res);
    }
    if (req.method == 'GET') {
        if (req.query._recommend) {
            return getRecommendations(req, res);
        }
        return getRecents(req, res);
    }
}

async function updateRecentlyPlayed(req, res) {
    try {
        let { db } = await connectToDatabase();
        const data = JSON.parse(req.body);

        await db.collection('users').updateOne(
            {
                email: data['email']
            },
            { $pull: { recently_played: data['id'] } }
        );

        await db.collection('users').updateOne(
            {
                email: data['email']
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

async function getRecentIds(req, res) {
    try {
        let { db } = await connectToDatabase();
        const email = req.query._email;

        let results = await db
            .collection('users')
            .find({
                email: email
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

async function getRecents(req, res) {
    try {
        let { db } = await connectToDatabase();
        let songIds = await getRecentIds(req, res);
        
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

async function getRecommendations(req, res) {
    try {
        let songIds = await getRecentIds(req, res);
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