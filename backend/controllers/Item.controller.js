const { db } = require("../conf")

// ITEMS FETCHING || GET
exports.fetchItems = (req, res) => {
    db.query(
        "SELECT * from items",
        (err, results) => {
            if (err) {
            res.status(500).send("Erreur lors de la récupération des données")
            } else {
            res.status(200).json(results)
            }
        }
    )
}