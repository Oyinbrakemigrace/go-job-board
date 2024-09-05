import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Applayout = () => {
    return (
        <div>
            <div className="grid-background"></div>
            <main className='min-h-screen'>
                <Header />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Applayout