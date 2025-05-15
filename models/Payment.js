import mongoose from "mongoose";
const {Schema, model} = mongoose;

const PaymentSchema = new Schema({
    name : {type:String},
    to_user : {type:String},
    oid : {type:String},
    amount : {type : Number},
    message : {type : String},
    CreatedAt : {type:Date, default : Date.now},
    done :{type: Boolean, default : false}
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);