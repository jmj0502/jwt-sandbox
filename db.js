//here we are going to require our db module and set it up.
const mysql = require('mysql');

//here we are going to setup our db connection. we are going to create a pool (a instance that allows us to mantain connections to multiple dbs), and we are going to set up it's configuration using the env variables we just create (to siulate a real enviroment). 
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '27676046Mar$',
    port: 3306,
    database: 'testDB'
});

pool.getConnection( (err) => {
    if (err) {
        throw(err);
    }
    console.log('Connected!');
});

module.exports = pool;