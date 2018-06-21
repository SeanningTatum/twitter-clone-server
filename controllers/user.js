


/** 
 * This function creates a user
 * hashes the password then saves 
 * user in database
 * @param {*} req
 */
exports.createUser = (req, res, next) => {
   console.log(res);
   const query = `
      INSERT INTO users (user_ID, name, handle, password) 
      VALUES ('null', '${res.body.name}', '${res.body.handle}', '${res.body.password}');
   `
   res.locals.connection.query(query, (error, results, fields) => {
      res.send("inserted!");
   });
}