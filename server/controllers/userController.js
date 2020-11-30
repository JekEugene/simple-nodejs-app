const User = require("../models/user")
const Certificate = require("../models/certificateOfAuthorship")
const Application = require("../models/application")
 
exports.getUser = async function(req, res){
    try{
        if(req.session.is_admin===true){
            res.redirect("/admin")
        }
        const user = await User.findOne({ where: {id: req.session.clientId}, raw: true });
        res.render("user.hbs", {
            userId: user.id,
            userName: user.name            
        });
    } catch(e){
        console.log(e);
    }
};

exports.getCerts = async function (req, res){
    try{
        const cers = await Certificate.findAll({ where: {userId: req.session.clientId}, raw: true });
        res.render("userCers.hbs", {
            cers: cers.map((el)=>{
                return {
                    patent_name: el.patent_name,
                    patent_type: el.patent_type,
                }
            }),
        });
    } catch(e){
        console.log(e);
    }
    
};

exports.getApps = async function (req, res){
    try{
        const apps = await Application.findAll({ where: {userId: req.session.clientId} , raw: true });
        res.render("userApps.hbs", {
            apps: apps.map((el)=>{
                const {patent_name, patent_type, is_checked, check_type,} = el;
                return {
                    patent_name,
                    patent_type,
                    is_checked,
                    check_type
                }
            }),
        });
    } catch(e){
        console.log(e);
    }
    
};

exports.postApps = async function(req, res){
    try{
        const {patent_name, patent_type, userId} = req.body;
        const same = await Application.findOne({where:{patent_name: patent_name}})
        if(same === null && patent_name.trim() != "" && patent_type.trim() != ""){
            await Application.create({
                userId,
                patent_name,
                patent_type,
                is_checked: false
            })
            console.log(same)
            res.redirect("/user")
        } else {
            res.redirect("/user")
        }
    
        
    } catch (e) {
        console.log(e)
    }
};