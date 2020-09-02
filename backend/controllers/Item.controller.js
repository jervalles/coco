/**
 * @controller ItemController
 * @description Handling items requests
 * @method fetchItems
 */

const { db } = require("../conf")

/**
 * @description fetching all items
 * @listens /api/items/
 * @method fetchItems
 * @param {req} req request
 * @param {res} res response
 * @param {next} next callback method to call next middleware
 * @returns {Array} items json format
 */

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