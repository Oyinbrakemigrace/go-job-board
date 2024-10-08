import { getSavedJobs } from '@/api/apiJobs'
import Heading from '@/components/Heading'
import JobCard from '@/components/JobCard'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'

const SavedJob = () => {

  const{isLoaded} = useUser()

  const{
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs
  }=useFetch(getSavedJobs)

  useEffect(()=>{
    isLoaded && fnSavedJobs()
  },[isLoaded])

  if(!isLoaded || loadingSavedJobs){
    return <BarLoader className='mb-4' width={"100%"} color="#524f75" />
  }

  return (
    <div className='px-5'>
      <Heading title="Saved Jobs"/>
      {
        loadingSavedJobs === false && (
          <div className='mt- grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              savedJobs?.length ? (
                savedJobs.map((saved)=>{
                  return(
                    <JobCard 
                    key={saved.id}
                    job={saved.job}
                    savedInit={true}
                    onJobSaved={fnSavedJobs}
                    />
                  )
                })
              ) : <div>No Saved Jobs Found 👀</div>
            }
          </div>
        )
      }
    </div>
  )
}

export default SavedJob