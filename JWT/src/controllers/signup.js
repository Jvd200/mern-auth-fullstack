const userService=require("../services/signup")

async function createUser(req,res){
    try{
        const userData=req.body;
        const user=await userService.createUser(userData)
        res.status(202).json({user:user, message:"User created successfully"}

        )}catch(error){
            res.status(400).json({message:"Error creating user", error:error})
        }
    }
module.exports={createUser};