import AppliedJobs from '@/components/AppliedJobs'
import CreatedJobs from '@/components/CreatedJobs'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners'

const MyJobs = () => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#fe5' />
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        {
          user?.unsafeMetadata?.role === "candidate" ? "Applied Jobs" : "Created Jobs"
        }
      </h1>
      {
        user?.unsafeMetadata?.role === "candidate" ? <AppliedJobs /> : <CreatedJobs />
      }
    </div>
  )
}

export default MyJobs