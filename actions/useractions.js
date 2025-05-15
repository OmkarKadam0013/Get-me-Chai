"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import Username from "@/app/[username]/page"

export const initiate = async (amount, to_username, paymentfrom) => {
    await connectDB()
    let user = await User.findOne({username : to_username});
    // let secret = user.razorpay_secret
    var instance = new Razorpay({ key_id: user.razorpay_id, key_secret: user.razorpay_secret })

    let options = {
        amount : Number.parseInt(amount),
        currency : "INR",
    }
    let x = await instance.orders.create(options)

    await Payment.create({
        oid:x.id,
        amount : amount / 100,
        to_user : to_username,
        name : paymentfrom.name,
        message : paymentfrom.message
    })

    return x
}

export const fetchuser = async(username)=>{
    await connectDB()
    let u =  await User.findOne({username : username})
    if(u !== null){
        let user = u.toObject({flattenObjectIds : true})
        return user
    }
    return u
}

export const fetchPayments =  async(username)=>{
    await connectDB()
    let p = await Payment.find({to_user : username,done:true}).sort({amount:-1}).lean()
    return p
}

export const UpdateUser = async(data,oldusername)=>{
    await connectDB()
    let ndata = Object.fromEntries(data)

    if(oldusername !== ndata.username){
        let u = await User.findOne({username : ndata.username})
        if(u){
            console.log("returning ho raha hai bhai");
            return {error : "Username already exists !!"}
        }
        await User.updateOne({email : ndata.email},ndata)
        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    }
    else{
        await User.updateOne({email : ndata.email},ndata)

    }
    
    

}