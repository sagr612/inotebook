const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    // name:  String, // String is shorthand for {type: String}
    // author: String,
    // body:   String,
    // comments: [{ body: String, date: Date }],
    // date: { type: Date, default: Date.now },
    // hidden: Boolean,
    // meta: {
    //   votes: Number,
    //   favs:  Number
    // }

    name:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    date:{
        type:Date,
        default:Date.now
    }
  });

  const User=mongoose.model('User',userSchema);
  module.exports=User;