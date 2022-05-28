import { getSession } from 'next-auth/react';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../util/mongodb');

export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401);
        res.end()
        return;
    }

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
        console.log(error);
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}