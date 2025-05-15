"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

export const Navbar = () => {
  const { data: session } = useSession()
  const [dropmenu, setdropmenu] = useState(false)
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  return (
    <nav className='bg-gray-900 text-white flex items-center justify-between p-4'>
      <Link href={"/"}>
        <p className='font-bold text-lg hover:cursor-pointer flex justify-center items-center'><span><img width={44} src="chai.webp" alt="chaha" /></span>GetMeChaha</p>
      </Link>
      <div className='w-1/2'>
        <ul className='flex justify-end items-center gap-x-3'>
          {session && <><button onClick={() => setdropmenu(!dropmenu)} onBlur={()=>{setTimeout(()=>setdropmenu(!dropmenu), 1000)}}  id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{`Welcome  ${session.user.email}`}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>

            <div  id="dropdown" className={`absolute top-16 right-2 z-10 ${dropmenu ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                </li>
                <li>
                  <button onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</button>
                </li>
              </ul>
            </div></>}

          {!session && <Link href="/login"><li className='hover:cursor-pointer '><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button></li></Link>}

        </ul>
      </div>
    </nav>
  )
}
