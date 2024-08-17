const express = require("express");
const { z } = require("zod")
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

const signupBody = z.object({
    username : z.string(),
    firstName : z.string(),
    password: z.string(),
    lastName: z.string(),
})

const signinBody = z.object({
    username: z.string().email({message:"email is requried"}),
    password: z.string()
})

const updateBody = z.object({
    username: z.string().email(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

const bulkBody = z.object({
    filter: z.string(),
})

userRouter.post("/signup", async (req, res) => {
    
        const { success } = signupBody.safeParse(req.body);

        if (!success) {
            res.status(411).json({message: "error while signup"});
        }

        const userExist = await User.findOne({username : req.body.username});
        if (userExist) {
            res.status(411).json({message: "user already existed"});
        }
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName : req.body.firstName,
            lastName: req.body.lastName,
        })
        user.save();
        const userId = user._id;
        const token = jwt.sign({userId}, JWT_SECRET)
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000,
        })
        res.status(200).json({
            message: "user successfully signup",
            token: token,
            userId : userId
        });


    
        

     
    
})

userRouter.post("/signin", async (req, res) => {
    

    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({message: "error while logging in"});
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    }); 
    

    if (user) {
        
        const userId = user._id;
        const token = jwt.sign({userId}, JWT_SECRET);
        return res.status(200).json({
            token: token,
            userId : user._id
        });
        
        
    }

    return res.status(411).json({message: "Invalid username or invalid pasword"});
    
});

userRouter.get("/user", authMiddleware, async (req, res) => {
    const reponse = await User.findOne({_id : req.userId});
    res.status(200).json({user : reponse});
})

userRouter.put("/user", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({message: "error while updating information"});
    }
    
    await User.updateOne({_id: req.userId}, req.body);
    res.status(200).json({message: "updated successfully"});

})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    
    
    const filter = req.query.filter || " ";

    const users = await User.find({
        $or : [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            } 
        }]
    })
    users.filter((user) => user._id !== req.userId);
    

    res.status(200).json({
        users: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
    

    
    
})



module.exports = userRouter;