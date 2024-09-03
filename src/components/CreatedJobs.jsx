import { getCreatedJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import JobCard from './JobCard'

const CreatedJobs = () => {
    const { user, isLoaded } = useUser()

    const{
        loading: loadingCreatedJobs,
        data: createdJobsData,
        fn: fnCreatedJobs
    }=useFetch(getCreatedJobs,{
        recruiter_id : user.id
    })

    useEffect(()=>{
        fnCreatedJobs()
    },[])

    if(!isLoaded || loadingCreatedJobs){
        return(
            <BarLoader className='mb-4' width={"100%"} color='#524f75'/>
        )
    }

    return (
        <div>
            <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    createdJobsData?.length ? (
                        createdJobsData?.map((job)=>{
                            return (
                                <JobCard 
                                key={job.id}
                                job={job}
                                onJobSaved={fnCreatedJobs}
                                isMyJob
                                />
                            )
                        })
                    ): <div>No Jobs Found 👀</div>
                }
            </div>
        </div>
    )
}

export default CreatedJobs