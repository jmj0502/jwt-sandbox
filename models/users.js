//here we are going to setup the interactions between our app and the db.
const db = require('../db');
//this is going to be our first function it will check the connection between our app and our db.
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from users', (err, rows) => {
            if (err) reject(err);
                resolve(rows);
            
        });
    });
};

//this is going to be our setup for the register route.
const insert = ({email, password, name, surname}) => {
    return new Promise ((resolve, reject) => {
        db.query('insert into users values(email, password, name, surname,) values (?, ?, ?, ?)', [email, password, name, surname], (err, data) =>{
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

//this is how we get userdata from an email.
const getByEmail = (email) => {
    return new Promise ((resolve, reject) => {
        db.query('select * from users where email = ?', [email], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
};

//this is our last module, it will be used to protect the main route we access after th login process.
const getById = (Id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where id = ?', [Id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows[0]);
            }
        });
    });
};

//here we are going to export our functions as we create then.
module.exports = {
    getAll: getAll,
    insert: insert,
    getByEmail: getByEmail,
    getById: getById
};