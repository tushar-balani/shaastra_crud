var Userdb = require('../model/model');

//create nad save new user 
exports.create = (req,res)=>{
    //validate request 
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty!"})
        return;
    }
    //new user 
    const users = new Userdb({

        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status:req.body.status
    }
        
    )
    //save user databes
    users
    .save(users)
    .then(data=>{
        res.redirect('/add-user')

    })
    .catch(err=>{
        res.status(500)
        message:err.message||"Some error occured while creating the app"
    })

}

exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:"Not found user wiith id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Occured while retriving id"+ id})
        })
    }else
    {Userdb.find()
    .then(users=>{
        res.send(users)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Error Occured while retriving user information"})
    })
    }
}

exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update cannot be empty"})
    }
   const id = req.params.id;
   
   Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
   .then(data=>{
    if(!data){
        res.status(404).send({message:`Cannnot update user with ${id}. Maybe user not found `})
    }else{
        res.send(data)
    }
   })
   .catch(err=>{
    res.status(500).send({message:err.message||"Error Occured while updating user information"})
   })

}

    

exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannnot delete user with ${id}. Maybe user not found `})
        }else{
            res.send({message: "User deleted successfully"})
        }


    })
    .catch(err=>{
        res.status(500).send({message:err.message||"Could not delete user with id"+ id})
       })
}
