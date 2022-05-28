import { getSession } from 'next-auth/react';

const axios = require('axios');

axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401);
        res.end()
        return;
    }

    return getRecommendations(req, res);
}

async function getRecommendations(req, res) {
    try {
        const songs = await axios.post('/single', {track_id: req.query._id, n_songs: req.query._n_songs})
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