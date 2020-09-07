/**
 * @controller ItemCategoriesController
 * @description Handling items categories requests
 * @method fetchCategories
 */

const { db } = require("../conf")

/**
 * @description fetching all item categories
 * @listens /api/item-categories/
 * @method fetchCategories
 * @param {req} req request
 * @param {res} res response
 * @param {next} next callback method to call next middleware
 * @returns {Array} item categories json format
 */

exports.fetchCategories = (req, res) => {
    db.query(
        "SELECT category.id, category.name FROM category;",
        (err, results) => {
            if (err) {
                res.status(500).send("Erreur lors de la récupération des données")
            } else {
                res.status(200).json(results)
            }
        }
    )
}