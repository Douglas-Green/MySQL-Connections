//& Several ways to create a MySQL connection in Nodejs

//* This is a very common way to create a MySQL connection in Nodejs. Note that this is a single created connection. which is fine if you only need one request. Further down the file you will see that we can also create a 'pool' of connections to deal with multiple connections at once.
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_db'
});

db.connect((err) => {
  if (err) {
    console.log(`Uh-oh trouble coming from Back-end could not connect to MySQL: `, err);
    return;
  }
  console.log(`Greetings from the back-end!`, db.threadId);
});

module.exports = db;

//* You can also create a MySQL connection in Nodejs using the 'pool' method.
//* The pool method is used to create a pool of connections that can be reused.
//* This is useful when you have multiple requests coming in at the same time.
//* More efficient with multiple connections instead of creating a new connection for each request. So if you have many requests coming in at the same time, you can use the pool method to create a pool of connections that can be reused to improve performance.
const mysql = require('mysql');

const pool = mysql.createPool({ // ^ This function creates the pool
  connectionLimit: 10, // ^ This is the maximum number of connections to create at once
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_db',
});

pool.getConnection((err, connection) => { // ^ This function gets a connection from the pool
  if (err) { // ^ If there is an error, log the error
    console.log(`Uh-oh trouble coming from Back-end could not connect to MySQL: `, err);
    return; // ^ return to exit the function
  } 
  console.log(`Greetings from the back-end!`, connection.threadId);
}); // ^ if successful, log the connection threadId and message.

module.exports = pool; // ^ Export the pool

//* Ok another example using another promise(async-await) module.
const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try { // ^ This function creates the connection
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'my_db'
    }); // ^ This is the connection object
    
    console.log(`Greetings from the back-end!`, db.threadId);
    return db; // ^ if connection is successful return the connection object
  } catch (err) {
    console.log(`Uh-oh trouble coming from Back-end could not connect to MySQL: `, err);
    return null; // ^ if connection is unsuccessful return null
  }
}

async function queryDatabase() {
  try {
  const result = await db.execute("SELECT * FROM your_table");
  console.log("Query result: ", result);
  return result;
  } catch (err) {
    console.log(`Uh-oh trouble coming from Back-end could not query MySQL: `, err);
    return null;
  }
}

async function main() {
  const db = await connectToDatabase();
  if (db) {
    const result = await queryDatabase(db);
    console.log("Query result: ", result);
  }
}

main(); // ^ Finally call the main function to run the code

//* Finally my favorite way to create a MySQL connection in Nodejs is using the 'mysql2' module. This is just like the pool version while also using the promise(async-await) method. very cool!
const mysql = require('mysql2/promise');

async function queryDatabase() { // ^ Here we create a function to query the database
  const connection = await mysql.createConnection({ // ^ this creates the connection
    host: 'your_host',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database'
  }); // ^ connection object

  const result = await connection.execute('SELECT * FROM your_table'); // ^ query the database using the .execute() method with the SQL query as an argument
  console.log('Results:', result); // ^ then just log the results which should return an array of objects

  connection.release(); // ^ then we release the connection
}

queryDatabase(); // ^ finally call/invoke/run/initialize the function

 // * End of file