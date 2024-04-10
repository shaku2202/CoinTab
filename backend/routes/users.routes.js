const express = require("express")
const { User } = require("../models/users.model")
const UserRouter = express.Router();
const axios = require("axios")

UserRouter.post("/",async (req,res)=>{
    try {
        let {id,name,email,city,phone,website,company} = req.body
        const newUser = await User.create({
            id:id,
            name:name,
            email:email,
            city:city,
            phone:phone,
            website:website,
            company:company,  
        })

        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Server error"})
    }
})

UserRouter.get("/",async (req,res)=>{
    try {
        let response = await axios("https://jsonplaceholder.typicode.com/users")
        let originalData = response.data
        let userData = await User.findAll({attributes:['id']});
        
        userData = userData.map(item => item.id)
        originalData = originalData.map(item => {
            if(userData.includes(item.id)){
                item.inDB = true;
            }
            else{
                item.inDB = false;
            }
            return item
        })
       
        res.status(200).json(originalData)
    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Internal server error"})
    }
})

module.exports = UserRouter