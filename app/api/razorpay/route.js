import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";
import { redirect } from "next/dist/server/api-utils";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDB();
    let body = await req.formData()
    body = Object.fromEntries(body)

    //check if razorpay order id is present or not
    let p = await Payment.findOne({ oid: body.razorpay_order_id })
    if (p === null){
        return NextResponse.json({ success: false, message: "Order Id not found" })
    }

    //fetch the secrate of user who is getting the payment
    let user = await User.findOne({username : p.to_user})
    const secret = user.razorpay_secret
    console.log("Printing the -", secret, process.env.KEY_SECRET)

    let xx = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, body.razorpay_signature, process.env.KEY_SECRET)

    if (xx) {
        //update into database
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URl}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URl}/${updatedPayment.to_user}?paymentdone=false`)
    }

}
