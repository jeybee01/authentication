const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const flash =  require('connect-flash');
const db = require('./models/index');
const route= require('./routes/route');

const port= 2000,


 app = express();


  
const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'session_test'
};
var sessionStore = new MySQLStore(options);

  db.sequelize.sync({force:true})

   app.set('view engine', 'ejs');

   app.use(bodyParser.urlencoded({extended:false}));
   app.use(express.static('public'));
   app.use(express.static(__dirname + '/public'));

app.use(session({
    secret:'secret key cookie',
    resave: false,
    saveUninitialized: false,
    store:sessionStore
    
}));
app.use(flash())

app.use('/', route);
   

app.listen(port,()=>{
    console.log(`server listening to port: ${port}`)
})
