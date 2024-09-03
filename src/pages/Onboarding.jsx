import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'

const Onboarding = () => {
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#524f75' />
  }

  const handleRoleSelection = async (role) => {
    await user.update({
      unsafeMetadata: { role }
    }).then(() => {
      navigate(role === "recruiter" ? "/post-job" : "/jobs")
    })
      .catch((error) => {
        console.error("Error updating role", error)
      })
  }

  // useEffect(() => {
    

  // }, [user])

  if (user && user?.unsafeMetadata?.role) {
    navigate(user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs")
  }


  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>Who are you?</h2>
      <div className='mt-16 grid lg:grid-cols-2 grid-cols-1 gap-4 w-full md:px-40'>
        <Button variant="orangeBlue" className="h-36 text-2xl text-zinc-100" onClick={() => handleRoleSelection("candidate")}>
          A Candidate
        </Button>
        <Button variant="oneTime" className="h-36 text-2xl" onClick={() => handleRoleSelection("recruiter")}>
          A Recruiter
        </Button>
      </div>
    </div>
  )
}

export default Onboarding