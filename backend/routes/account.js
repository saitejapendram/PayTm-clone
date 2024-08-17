const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, User, Transaction } = require("../db");
const mongoose = require("mongoose");


const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    

    const account = await Account.findOne({userId: req.userId});
    res.status(200).json({balance: account.balance});
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });

    const sender = await User.findOne({_id : req.userId});
    const receiver = await User.findOne({_id : to});
    const senderF = sender.firstName;
    const receiverF = receiver.firstName;

    if (account.balance < amount) {
        return res.status(400).json({
            message: "insufficient"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: false
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    const response = await Transaction.create({
        senderId : req.userId,
        receiverId : to,
        amount : amount,
        senderName : senderF,
        receiverName : receiverF,
        status : "success"
        
    })
    response.save();
    
    


    res.json({
        message: "sufficient",
        transactionId : response._id
    })
});

accountRouter.get("/transactions", authMiddleware, async (req, res) => {

    
    const senderId = req.query.senderId;
    

    
    try {

        
    const objectId = new mongoose.Types.ObjectId(senderId);
    const response = await Transaction.find({
        $or: [
            { senderId: objectId },
            { receiverId: objectId }
          ]
    })
    

    res.status(200).json({transactions : response});

    } catch (e) {
        console.log(e)
    }
    
})

module.exports = accountRouter;
