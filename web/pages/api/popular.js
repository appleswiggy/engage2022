// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../util/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    return getPopularSongs(req, res);
}

async function getPopularSongs(req, res) {
    try {
        let { db } = await connectToDatabase();
        let songs = await db
            .collection('Songs')
            .find({ popularity: { $gt: 93 } })
            .sort({ popularity: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(songs)),
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