

module.exports = {
    ensureAuth : (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/')
        }
    },

    ensureAdmin : (req, res, next) => {
        if(req.isAuthenticated() && req.user.adminStatus){
            return next()
        }else{
            res.render('error.ejs', { user : req.user, title : "Error page"})
        }
    }
}