import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import connectDB from '@/db/connectDb'

const Username = async({params}) => {

    let u = await User.findOne({username:params.username});
    if(!u){
      return notFound()
    }

  return (
    <>
    <PaymentPage username = {params.username} /> 
      
    </>
  )
}

export default Username
