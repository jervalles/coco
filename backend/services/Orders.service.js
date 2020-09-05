const { db } = require("../conf")

class OrdersService {

    static async getById(properties) {
        const orderId = properties

        return new Promise(function(resolve, reject) {
            db.query(
                "SELECT COUNT(orders.id) AS count from orders WHERE id = ?", orderId,
                (err, rows) => {

                    if (err) {
                        reject(err)

                    } else {
                        let results = rows[0].count
                        if (results > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    }
                }
            )
        })
      }
}

module.exports = OrdersService