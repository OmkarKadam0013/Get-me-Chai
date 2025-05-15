"use client"
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut,update } from "next-auth/react"
import { UpdateUser,fetchuser } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'



const Dashboard = () => {
  const {data : session , update} = useSession()
  const router = useRouter()
  const [form, setform] = useState({})

  const handlechange = (e)=>{
    setform({...form, [e.target.name] : e.target.value})
  }

  useEffect(() => {
    if(!session){
      router.push("/login")
    }
    else{
      getData()
    }

  }, [session,router])

  const getData = async()=>{
    let u = await fetchuser(session.user.name)
    setform(u)
  }

  const handleSubmit = async(e)=>{
    update()
    let a = await UpdateUser(e,session.user.name)
    toast('Updated Profile Successfully', {
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
    <div className='pt-8'>
      <form action={handleSubmit}>
      <div className='flex flex-col items-center container gap-2'>
        <h2 className=' text-2xl font-bold'>Welcome to your dashboard</h2>
        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">name</label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='name' value={form.name ?form.name:""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>
        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">Email</label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='email' value={form.email? form.email :""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>
        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">Username</label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='username' value={form.username?form.username:""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>
        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">Profile Picture</label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='profilepic' value={form.profilepic ?form.profilepic:""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>
        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">Cover picture</label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='coverPic' value={form.coverPic? form.coverPic:""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>

        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">Razorpay Id </label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='razorpay_id' value={form.razorpay_id? form.razorpay_id:""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>

        <div className='w-1/3'>
        <label className='block w-full ml-1 mb-1 ' htmlFor="name">Razorpay Secret </label>
        <input onChange={(e)=>{handlechange(e)}} type="text" name='razorpay_secret' value={form.razorpay_secret ? form.razorpay_secret:""} className='bg-slate-800 w-full p-1 rounded-lg border-[1px]' />  
        </div>
        <div>
        <input type="submit" className='mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' />
        </div>
              
      </div>
      </form>
    </div>
    </>
  )
}

export default Dashboard
