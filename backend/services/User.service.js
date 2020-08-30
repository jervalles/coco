const { db } = require("../conf")

class UserService {

    static async getByEmail(properties) {
        const user = properties

        return new Promise(function(resolve, reject) {
            db.query(
                "SELECT COUNT(user.email) AS count from user WHERE email = ?", user,
                (err, rows) => {
                    let results = rows[0].count
                    if (err) {
                        reject(err)
                    } else {
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

module.exports = UserService