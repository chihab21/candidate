const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'is required']

    },
    lastname: {
        type: String
    },
    age: {
        type: Number
    },
    email:{
        type:String,
        required:[true, 'is required'],
        unique:true,
        index:true,
        
    },
    password:{
        type:String,
        
    },

}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
