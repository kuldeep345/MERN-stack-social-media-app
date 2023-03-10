import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        min:2,
        min:50
    },
    lastName:{
        type:String,
        require:true,
        min:2,
        max:50
    },
    email:{
        type:String,
        require:true,
        min:2,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    picturePath:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewProfile:Number,
    impressions:Number
},
{ timestamps:true}
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User