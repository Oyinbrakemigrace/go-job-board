import AppliedJobs from '@/components/AppliedJobs'
import CreatedJobs from '@/components/CreatedJobs'
import Heading from '@/components/Heading'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners'

const MyJobs = () => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#524f75' />
  }

  return (
    <div>
      <Heading title={user?.unsafeMetadata?.role === "candidate" ? "Applied Jobs" : "Created Jobs"}/>
      {
        user?.unsafeMetadata?.role === "candidate" ? <AppliedJobs /> : <CreatedJobs />
      }
    </div>
  )
}

export default MyJobs