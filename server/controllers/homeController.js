const User = require("../models/user.js")
const bcrypt = require('bcryptjs')

exports.loginPage = function(req, res) {
    if(req.session.clientId != null){
        if(req.session.is_admin===true){
            res.redirect("/admin")
        }
        if(req.session.is_admin===false){
            res.redirect("/user")
        }
    }
    res.render("main.hbs")
}

exports.login = async function(req, res){
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({ where: {email: email}, raw:true})
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                req.session.clientId = candidate.id;
                req.session.is_admin = candidate.isAdmin;
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    if(req.session.is_admin)
                        res.redirect("/admin")
                    else
                        res.redirect("/user")
                })
            } else {
                res.redirect('/')
            }
        } else {
          res.redirect('/')
        }
    } catch (e) {
    console.log(e)
    }
    
}

exports.register = async function(req, res){
    const {email, name, password} = req.body;
    hashPassword = await bcrypt.hash(password, 10)
    await User.create({
        email,
        name,
        password: hashPassword,
        isAdmin: false
    }).then(()=>{
        res.redirect("/")
    }).catch((e)=>{
        console.log(e)
        res.redirect("/")
    })
}

exports.logout = async function(req, res){
    req.session.destroy(()=>{
        res.redirect("/")
    })
}