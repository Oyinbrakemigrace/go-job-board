import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='p-5 text-center text-zinc-700 bg-zinc-200 mt-10'>Created by <Link to="https://grace-ofubu.vercel.app" className='underline font-bold'>Grace O</Link></div>
  )
}

export default Footer