const bcrypt = require('bcryptjs');
const db = require('../models/index');
exports.controllers = {
    create: async (req, res)=>{
        const user= req.body;
        const email = user.email;

        const userEmail = await db.users.findOne({where:{email:email}});

            if (!userEmail) {
                user.password = await bcrypt.hash(user.password, 10);
                const userCreate = await db.users.create(user);
                req.flash('users', 'User Created');
                res.redirect('/login');
            }
            else{
                console.log('user Already exist');
                req.flash('user', 'User Already exist');
                res.redirect('/register');
            }

    },

            signin: async (req, res)=>{
            const  {email, password}= req.body;
                const isemail = await db.users.findOne({where:{email:email}});
                    if (isemail) {
                        const isPassword = await bcrypt.compare(password, isemail.password);
                        if(isPassword){
                            req.session.isAuth= true;
                            req.flash('user', isemail.username);
                            res.redirect('/dashboard');
                            return
                        }
                        else{
                            req.flash('user', "Wrong Email or Password");
                            res.redirect('/login');
                        return;
                        }  
                    }
                    else{
                        req.flash('user', "Wrong Email or Password");
                            res.redirect('/login');
                        return;
                    }
            },

}