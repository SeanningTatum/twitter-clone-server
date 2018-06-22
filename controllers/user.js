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
      if (error) res.send(error);

      res.send("inserted!");
   });
}

exports.validateUser = (req, res, next) => {
   const query = `
      SELECT * from users WHERE email = ${req.body.email}
   `
   res.locals.connection.query(query, (error, results, fields) => {
      if (error) res.send(error);

      res.status(200).send({results: results});
   })
}