import { db } from '../../db/db';


export const getPaginatedStations = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    console.log(db)
    db.all<{ count: number }>("SELECT COUNT(*) AS count FROM radioStations", (err, countResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const total = countResult[0].count;
        console.log(total)
        db.all("SELECT * FROM radioStations LIMIT ? OFFSET ?", [limit, offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                data: rows
            });
        });
    });
}