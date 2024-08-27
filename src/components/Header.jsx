import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
    return (
        <>
            <nav className='flex justify-between items-center py-4'>
                <Link>
                <img src='/vite.svg' className='h-20' />
                </Link>
                <Button variant="outline">Login</Button>
        </nav>
        </>
    )
}

export default Header