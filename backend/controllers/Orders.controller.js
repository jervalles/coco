/**
 * @controller OrderController
 * @description Handling orders requests
 * @method fetchOrders
 */

const { db } = require("../conf")

function groupBy(key, array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
      let added = false
      for (let j = 0; j < result.length; j++) {
        if (result[j][key] == array[i][key]) {
          result[j].items.push(array[i])
          added = true
          break
        }
      }
      if (!added) {
        let entry = {items: []}
        entry[key] = array[i][key]
        entry.items.push(array[i])
        result.push(entry)
      }
    }
    return result
  }

/**
 * @description fetching all orders
 * @listens /api/orders/
 * @method fetchOrders
 * @param {req} req request
 * @param {res} res response
 * @param {next} next callback method to call next middleware
 * @returns {Array} orders json format
 */

exports.fetchOrders = (req, res) => {

    try {
        db.query(
            "SELECT orders.id AS orderId, orders.date as orderDate, user.id AS userId, user.email AS userEmail, items.name AS itemName, order_items.quantity, items.price AS itemPrice \
            FROM orders \
            INNER JOIN order_items ON orders.id = order_items.orders_id \
            INNER JOIN items ON items.id = order_items.items_id \
            INNER JOIN user ON user.id = orders.user_id \
            ORDER by orders.id;",
            (err, results) => {
                if (err) {
                    res.status(500).send("Erreur lors de la récupération des données")
                } else {
                    const orders = groupBy("orderId", results)
                    res.status(200).json(orders)
                }
            }
        )
    } catch (err) {
        return next(err)
    }
    
}