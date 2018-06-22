const mysql = require("mysql");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = 'secret';
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
      if (error) return res.json(error);

      return res.status(200)
         .json({message: success});
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
         res.status(500).json(error)
      };

      if(results.length === 0) {
         return res.status(403)
            .json({status: 403, message: "Email could not be found"});  
      }

      const user = results[0];
      const hash = user.password;
      const passwordsMatch = await bcrypt.compare(req.body.password, hash);

      if(!passwordsMatch) {
         return res.status(401)
            .json({message: "Incorrect password"})
      }

      const token = await jwt.sign(
         {email: user.email, }, 
         secret, 
         { expiresIn: '1h' }
      );
         
      return res.status(200).json({
         token: token,
         expiresIn: 3600,
         userID: user.user_ID
      });
   })


   
}