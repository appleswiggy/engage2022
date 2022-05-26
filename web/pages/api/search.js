// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../util/mongodb');

export default async function handler(req, res) {
    return searchSongs(req, res);
}

async function searchSongs(req, res) {
    try {
        if (req.query._query) {
            let { db } = await connectToDatabase();
            let results = await db.collection('Songs')
                .aggregate([
                    {
                        $search: {
                            index: "default",
                            compound: {
                                must: [
                                    {
                                        text: {
                                            query: req.query._query,
                                            path: {
                                                "wildcard": "*"
                                            },
                                        }
                                    }
                                ]
                            }
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            id: 1,
                            img: 1,
                            artists: 1,
                            score: { $meta: "searchScore" },
                        },
                    },
                    {
                        $limit: 10,
                    },
                ]).toArray();

                // console.log(results);

                return res.json({
                    message: JSON.parse(JSON.stringify(results)),
                    success: true,
                });

        }
        return res.json({
            message: [],
            success: false,
        });

    } catch (error) {
        console.log("popular.js: " + error);
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}