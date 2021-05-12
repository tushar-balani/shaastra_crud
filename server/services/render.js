const axios = require('axios');

exports.homeRoutes=(req,res)=>{
            //console.log(response)
        axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index',{users:response.data})
            res.json(response.data)
        })
        .catch(err=>{
            res.send(err);
        })

}
exports.add_user=(req,res)=>{
    res.render('add-user');
}
exports.update_user=(req,res)=>{
    res.render('update-user');
}