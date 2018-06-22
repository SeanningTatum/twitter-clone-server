const mysql = require("mysql");
const bcrypt = require('bcrypt');


/** 
 * This function creates a user
 * hashes the password then saves 
 * user in database
 */
exports.createUser = async (req, res, next) => {
   const hashedPassword = await bcrypt.hash(req.body.password, 2);
   const query = `
         INSERT INTO users (user_ID, email, name, handle, password) 
         VALUES ('null','${req.body.email}', '${req.body.name}', '${req.body.handle}', '${hashedPassword}');
      `
   res.locals.connection.query(query, (error, results, fields) => {
      if (error) return res.send(error);

      return res.status(200)
         .send("Success");
   });
   
}

exports.validateUser = (req, res, next) => {
   const query = `
      SELECT * from users 
      WHERE 
      email = ${mysql.escape(req.body.email)} 
   `;

   res.locals.connection.query(query, async (error, results, fields) => {
      if (error) {
         res.send(error)
      };

      if(results.length === 0) {
         return res.status(403)
            .send({status: 403, message: "Invalid email or password"});  
      }

      const hash = results[0].password;
      const result = await bcrypt.compare(req.body.password, hash);
         

      return res.status(200).send(result);
   })


   
}