require('dotenv').config();

const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Optionally add more configuration here
  }
)
        .then(() => {
           console.log("connected to db");
        }) 

const userSchema = new mongoose.Schema({
      username : {
        type: String,
        required: true,

        trim: true,
        lowercase: true,
        minLength : 3,
        maxLength: 30
      },
      password : {
        type: String,
        required: true,
        minLength: 6
      },
      firstName : {
        type: String,
        required : true,
        trim : true,
        maxLength : 50
      },
      lastName : {
        type: String,
        required : true,
        trim : true,
        maxLength : 50
      }

})

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const transactionSchema = new mongoose.Schema({
      senderId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      senderName : String,
      receiverName : String,
      amount : Number,
      status : {
        type : String,
        default : ''
      }

})


const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  User,
  Account,
  Transaction
}