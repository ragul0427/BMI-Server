const express=require("express")
const router=express.Router()
const {getUser,createUser}=require("../controllers/adminUserController")
const authenticateToken=require("../middleWare/AuthenticateUser")

router.post("/create",getUser).post("/createuser",createUser).get("/validateToken",authenticateToken,(req,res)=>{
    res.status(200).send(req.user)
})

module.exports=router