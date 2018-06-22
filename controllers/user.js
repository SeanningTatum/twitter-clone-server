const mysql = require("mysql");
/** 
 * This function creates a user
 * hashes the password then saves 
 * user in database
 * @param {*} req
 */
exports.createUser = (req, res, next) => {
   console.log(req.body);
   const query = `
      INSERT INTO users (user_ID, email, name, handle, password) 
      VALUES ('null','${req.body.email}', '${req.body.name}', '${req.body.handle}', '${req.body.password}');
   `
   res.locals.connection.query(query, (error, results, fields) => {
      if (error) return res.send(error);

      return res.send("inserted!");
   });
}

exports.validateUser = (req, res, next) => {
   console.log(req.body);
   const query = `
      SELECT * from users 
      WHERE 
      password = ${mysql.escape(req.body.password)}
      AND
      email = ${mysql.escape(req.body.email)} 
   `
   res.locals.connection.query(query, (error, results, fields) => {
      if (error) res.send(error);

      if(results.length === 0) {
         return (
            res.status(403)
               .send({status: 403, message: "Invalid email or password"})
         );
         
      }

      return res.status(200).send({results: results});
   })
}