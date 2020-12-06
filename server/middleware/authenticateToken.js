module.exports = function(req, res, next) {
    const auth = req.headers["authorization"]
    const token = auth && auth.split(' ')[1]
    if (token == null) {
        req.user = { role: 0 }
        next()
    }

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}