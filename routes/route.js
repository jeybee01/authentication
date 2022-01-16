const express = require('express');
const {controllers}= require('../controllers/auth');
const {isAuth} = require('../middleware/auth');

const route = express.Router();


route.get('/', (req, res)=>{
    res.render('index');
});


route.get('/login', (req, res)=>{
    res.render('login', {message:req.flash('user'), messages:req.flash('users')});
});


route.post('/login', controllers.signin);
route.get('/register', (req, res)=>{
    res.render('register', {message:req.flash('user')});
});

route.post('/register',  controllers.create);

route.get('/dashboard', isAuth, (req, res)=>{
    res.render('dashboard', {message:req.flash('user')});
});
route.post('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        if(err) throw err;
        res.redirect('/register');
    })
})
module.exports = route