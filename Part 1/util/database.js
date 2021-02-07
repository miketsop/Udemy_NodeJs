// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',  // schema
//     password: '03106004'
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize(
    'node-complete',
    'root', '03106004',
    { 
        dialect: 'mysql', 
        host: 'localhost' 
    }
);

module.exports = sequelize;