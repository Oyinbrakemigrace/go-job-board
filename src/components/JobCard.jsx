import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useFetch from '@/hooks/useFetch'
import { deleteJob, saveJobs } from '@/api/apiJobs'
import { BarLoader } from 'react-spinners'

const JobCard = ({ job, isMyJob = false, savedInit = false, onJobSaved = () => { } }) => {
    const [saved, setSaved] = useState(savedInit)
    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJob
    } = useFetch(saveJobs, { alreadySaved: saved })
    const { user } = useUser()

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id
        })
        onJobSaved()
    }

    const { loading: loadingDeletedJob, fn: fnDeleteJob } = useFetch(deleteJob, { job_id: job.id })

    const handleDeleteJob = async ()=>{
        await fnDeleteJob()
        onJobSaved()
    }

    useEffect(() => {
        if (savedJob !== undefined) {
            setSaved(savedJob?.length > 0)
        }
    }, [savedJob])

    return (
        <Card className='flex flex-col'>
            {
                loadingDeletedJob && (
                    <BarLoader className='mb-4' width={"100%"} color='#524f75' />
                )
            }
            <CardHeader>
                <CardTitle className="flex capitalize justify-between font-bold">
                    {job.title}
                    {isMyJob && (<Trash2Icon onClick={handleDeleteJob} fill='red' size={18} className='text-red-300 cursor-pointer' />)}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between '>
                    {
                        job.company && <img src={job.company.logo_url} alt={job.company.name} className='h-6' />
                    }
                    <div className="flex gap-2 items-center">
                        <MapPinIcon size={15} /> {job.location}
                    </div>
                </div>
                <hr />
                <span className='line-clamp-1'>{
                    job.description
                }</span>

            </CardContent>
            <CardFooter>
                <Link to={`/job/${job.id}`} className='flex-1'>
                    <Button variant="secondary" className="w-full text-zinc-700">
                        More Details
                    </Button>
                </Link>
                {
                    !isMyJob && (
                        <Button
                            variant="none"
                            className="w-15"
                            onClick={handleSaveJob}
                            disable={loadingSavedJob}
                        >
                            {
                                saved ? <Heart size={20} stroke='red' fill='red' className='mx-2 cursor-pointer' /> :
                                    <Heart size={20} className='mx-2 cursor-pointer' />
                            }
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
    )
}

export default JobCard