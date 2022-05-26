const axios = require('axios');

axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default async function handler(req, res) {
    return getRecommendations(req, res);
}

async function getRecommendations(req, res) {
    try {
        const songs = await axios.post('/single', {track_id: req.query._id})
        return res.json({
            message: JSON.parse(JSON.stringify(songs['data'])),
            success: true,
        });

    } catch (error) {
        console.log("popular.js: " + error);
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}