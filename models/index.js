 // Option 3: Passing parameters separately (other dialects)

 const Sequelize = require('sequelize');
 const sequelize=  new Sequelize('session_test', 'root', '', {
    host: 'localhost',
    dialect:"mysql",/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
  })
   .catch (error=>{
    console.error('Unable to connect to the database:', error);

   });



   const users = require('./users')(sequelize, Sequelize);

   const db = {};

   db.users = users;
   db.sequelize = sequelize;
   db.Sequelize = Sequelize;

   module.exports = db;