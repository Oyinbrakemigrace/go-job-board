import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { isLoaded, isSignedIn, user } = useUser()
    const { pathname } = useLocation()
    //console.log(user.unsafeMetadata);
    

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/?sign-in=true" />
    } //if the user is loaded and is not signed in

    if(user !== undefined && !user?.unsafeMetadata?.role && pathname !== 'onboarding'){
        return <Navigate to="/onboarding" />
    }

    return children
}


export default ProtectedRoutes