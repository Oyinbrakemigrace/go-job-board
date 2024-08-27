import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/useFetch'
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const JobListing = () => {
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { isLoaded } = useUser()
  const { func: fnJobs, data: jobsData, loading: jobsLoading } = useFetch(getJobs, {location, company_id, searchQuery})

  useEffect(() => {
    if (isLoaded) {
      fnJobs()
    }

  }, [isLoaded, location, company_id, searchQuery])


  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#fe5' />
  }

  return (
    <div>JobListing</div>
  )
}

export default JobListing