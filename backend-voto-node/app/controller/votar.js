function votar(req,res, next){

    res.send(req.session) 

}

module.exports = votar