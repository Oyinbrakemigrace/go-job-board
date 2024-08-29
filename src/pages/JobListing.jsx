import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/useFetch'
import { useSession, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const { isLoaded } = useUser()
  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, { location, company_id, searchQuery })

  useEffect(() => {
    isLoaded && fnJobs()
  }, [isLoaded, location, company_id, searchQuery])

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#fe5' />
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
        Latest Jobs
      </h1>


      {
        loadingJobs && (
          <BarLoader className='mt-4' width={'100%'} color='#fe5' />
        )
      }
      {
        loadingJobs === false && (
          <div>
            {
              jobs?.length ? (
                jobs.map((job) => {
                  return (<span>{job.title}</span>)

                })
              ) : (
                <div>No jobs found</div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default JobListing