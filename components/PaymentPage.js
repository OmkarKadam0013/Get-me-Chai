"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchuser, fetchPayments, initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { fetchData } from 'next-auth/client/_utils'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession()
  const [paymentform, setpaymentform] = useState({})
  const [currentUser, setcurrentUser] = useState({})
  const [dbpayments, setdbpayments] = useState([])
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    getdata()
  }, [])

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast('🦄 Payment has been made', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
    }
    router.push(`/${username}`);
  }, [])


  const handlechange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
  }

  const getdata = async () => {
    let u = await fetchuser(username)
    setcurrentUser(u)
    let p = await fetchPayments(username)
    setdbpayments(p)
    console.log("Printing the dbPayments : ", dbpayments);
  }

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform)
    let orderId = a.id
    var options = {
      "key": currentUser.razorpay_id, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Buy me a Chaha", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    }

    var rzp1 = new Razorpay(options);
    rzp1.open();
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>


      <div className="profile relative">
        <img src={currentUser.coverPic} alt="user" />
        <div className='photo absolute rounded-[100%] -bottom-10 right-[45%] overflow-hidden border-2'>
          <img className='rounded-[100%] h-[150px]' width={150} height={150} src={currentUser.profilepic} alt="Hacker" />
        </div>
      </div>
      <div className="main flex flex-col justify-center items-center mt-14">
        <span className='font-bold text-lg pb-2'>@{currentUser.username}</span>
        <span className='text-slate-300'>Lets help {username} to get a chai</span>
        <span className='text-slate-300'> {dbpayments.length} payments. ${dbpayments.reduce((a,b)=>a + b.amount, 0)} raised</span>
      </div>
      <div className="pb-5 pt-5 last container flex justify-center items-center">
        <div className="supporters h-[300px] overflow-auto rounded-lg m-4 bg-slate-900  w-1/2 p-4">
          <h3 className='font-bold text-lg m-3'>Supports</h3>
          <span>
            <ul className='m-6'>
              {dbpayments.length === 0 && <li>No payments yet</li>}
              {dbpayments.map((p, i) => {
                return <li key={i} className='m-2 flex items-center gap-3'><img width={34} className='rounded-full h-[30px] w-[30px]' src="supporter.jpeg" alt="" /> <span>{p.name} Supports you<span className='font-bold'> ${p.amount} </span> With message {p.message}</span></li>
              })}




            </ul>
          </span>

        </div>
        <div className=" payment rounded-lg p-4 m-4 bg-slate-900 w-1/2 flex flex-col justify-center items-center gap-3">
          <h2 className='font-bold text-lg'>Make a Payment</h2>
          <input onChange={(e) => handlechange(e)} name='name' value={paymentform.name} className='p-3 rounded-lg w-[80%] bg-black ' type="text" placeholder='Enter your name' />
          <input onChange={(e) => handlechange(e)} name='message' value={paymentform.message} className='p-3 rounded-lg w-[80%] bg-black' type="text" placeholder='Enter message' />
          <input onChange={(e) => handlechange(e)} name='amount' value={paymentform.amount} className='p-3 rounded-lg w-[80%] bg-black' type="text" placeholder='Enter ammount' />
          <button onClick={() => { pay(Number.parseInt(paymentform.amount) * 100) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pay</button>
          {/* <div className='w-1/2 flex justify-start gap-2'>
          <button className='bg-slate-700 p-2 rounded-lg'>Pay 10$</button>
          <button className='bg-slate-700 p-2 rounded-lg'>Pay 50$</button>
        </div> */}
        </div>
      </div>
    </>
  )
}

export default PaymentPage
