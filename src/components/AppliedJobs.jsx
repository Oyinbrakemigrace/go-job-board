import { getMyApplications } from '@/api/apiApplication'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import ApplicationCard from './ApplicationCard'

const AppliedJobs = () => {
    const { user, isLoaded } = useUser()
    const {
        loading: loadingAppliedJobs,
        data: appliedJobsData,
        fn: appliedJobsFn
    } = useFetch(getMyApplications, { user_id: user.id })

    useEffect(()=>{
        appliedJobsFn()
    },[])

    if(!isLoaded){
        return <BarLoader className='mb-4' width={"100%"} color='#fe5'/>
    }

    return (
        <div className='flex flex-col gap-3'>
            {
                appliedJobsData?.map((job)=>{
                    return(
                        <ApplicationCard 
                        key={job.id}
                        application={job}
                        isCandidate={true}
                        />
                    )
                })
            }
        </div>
    )
}

export default AppliedJobs