/**
 * @controller OrderController
 * @description Handling orders requests
 * @method fetchOrders
 * @method create
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
        entry['userEmail'] = array[i]['userEmail']
        entry['orderDate'] = array[i]['orderDate']
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

/**
 * @description creating an order
 * @listens /api/orders/
 * @method create
 * @param {req} req request
 * @param {res} res response
 * @param {next} next callback method to call next middleware
 * @returns {Array} new order json format
 */

exports.create = async (req, res, next) => {
  const formData = req.body

  const newOrder = {
    user_id: formData.user.userId,
    date: new Date()
  }

  const newOrderItems = formData.items

  try {
    await db.query(
      "INSERT INTO orders SET ?", newOrder, (err, results) => {
        if (err) {
            res.status(500).send("Erreur d'écriture des données")
        } else {
            newOrder.id = results.insertId

            for (let i = 0; i < newOrderItems.length; i++) {

              let orderItems = {
                orders_id: newOrder.id,
                items_id: newOrderItems[i].id,
                quantity: newOrderItems[i].added
              }

              db.query(
                "INSERT INTO order_items SET ?", orderItems, (err, results) => {
                  if (err) {
                    res.status(500).send("Erreur d'écriture des données")
                  } 
                }
              )
            }
            res.status(201).send({
              order: newOrder
            })

        }
    })

  } catch (err) {
      return next(err)
  }
}