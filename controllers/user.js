/** 
 * This function creates a user
 * hashes the password then saves 
 * user in database
 * @param {*} req
 */
exports.createUser = (req, res, next) => {
   console.log(req.body);
   const query = `
      INSERT INTO users (user_ID, name, handle, password) 
      VALUES ('null', '${req.body.name}', '${req.body.handle}', '${req.body.password}');
   `
   res.locals.connection.query(query, (error, results, fields) => {
      if (error) res.send(error);

      res.send("inserted!");
   });
}