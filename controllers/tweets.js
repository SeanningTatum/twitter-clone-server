exports.getTweets = (req, res, next) => {
   const query = 'SELECT * from tweets';

   res.locals.connection.query(query, (error, results, fields) => {
     if (error) return res.status(500);
     
     res.status(200);
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
}

exports.postTweet = (req, res, next) => {
   console.log(req.body);
   date = new Date().toISOString().slice(0, 19).replace('T', ' ');
 
   const query = `
       INSERT INTO tweets (name, handlerName, message, date, tweet_ID) 
       VALUES ('test', 'test', '${req.body.message}', '${date}', NULL)
     `;
   
   res.locals.connection.query(query, (error, results, fields) => {
     if (error) return res.status(500);
     
     res.status(200);
     res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    })
   
}