import mongoose from "mongoose";
const {Schema,model} = mongoose;

const UserSchema = new Schema({
    email : {type : String},
    name : { type: String },
    username : { type : String},
    profilepic : {type : String},
    coverPic : {type : String},
    razorpay_id:{type :String},
    razorpay_secret:{typr:String},
    createdAt : {type : Date, default : Date.now}
});

export default mongoose.models.User || mongoose.model("User",UserSchema);
