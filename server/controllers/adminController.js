const Certificate = require("../models/certificateOfAuthorship")
const Application = require("../models/application")
const User = require("../models/user.js")

exports.getApplications = async function(req, res){
    try {
        if(req.session.is_admin === false){
            res.redirect("/user")
        }
        const users = await User.findAll({ where: {isAdmin: false},  include: Application});
        if(users.length){
            const usersApp = users.map((user)=>{
                return {
                    applications: user.applications.map((application)=>{
                        const {patent_name, patent_type, is_checked, app_id} = application.dataValues
                        return {
                            user_name: user.name,
                            patent_name,
                            patent_type,
                            is_checked,
                            app_id,
                        }
                    }).filter((application) => application.is_checked===false)
                }
            })
            const hbsObject = {
                users: usersApp
            }
            res.render("admin.hbs", hbsObject);
        } else {
            hbsObject = {
                users
            }
            res.render("admin.hbs", hbsObject);
        }
    } catch(e){
        console.log(e);
    }
    
};

exports.postCheck = async function(req, res){
    try{
        const {app_id, check_type} = req.body;
        switch (check_type) {
            case "accept":
                const app = await Application.findOne({where: {id: app_id}, raw:true})
                const {userId, patent_name, patent_type} = app
                await Certificate.create({
                    userId,
                    patent_name,
                    patent_type,
                })
                await Application.update({is_checked: true, check_type: "accepted"},{where: {id: app_id}})
                break;
            case "denied":
                await Application.update({is_checked: true, check_type: "denied"},{where: {id: app_id}})
                break;
            default:
                console.log("wrong check_type")
                break;
        }
        res.redirect("/admin")
    } catch (e) {
        console.log(e)
    }
};