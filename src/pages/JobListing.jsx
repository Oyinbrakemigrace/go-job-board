import { getCompanies } from '@/api/apiCompanies'
import { getJobs } from '@/api/apiJobs'
import JobCard from '@/components/JobCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { useSession, useUser } from '@clerk/clerk-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { State } from 'country-state-city'
import Heading from '@/components/Heading'

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [company_id, setCompany_id] = useState("")
  const { isLoaded } = useUser()
  const { fn: fnJobs, data: jobs, loading: loadingJobs } = useFetch(getJobs, { location, company_id, searchQuery })

  const { fn: fnCompanies, data: companies, loading: loadingCompanies } = useFetch(getCompanies)

  useEffect(() => {
    isLoaded && fnJobs()
  }, [isLoaded, location, company_id, searchQuery])

  useEffect(() => {
    isLoaded && fnCompanies()
  }, [isLoaded])



  if (!isLoaded) {
    return <BarLoader className='mb-4' width={'100%'} color='#524f75' />
  }

  const handleSearch = (e) => {
    e.preventDefault()
    let formData = new FormData(e.target)

    const query = formData.get("search-query")
    if (query) {
      setSearchQuery(query)
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setCompany_id("")
    setLocation("")
  }

  return (
    <div>
      <Heading title="Latest Jobs"/>

      <form onSubmit={handleSearch} className='h-14 flex gap-2 w-full items-center mb-3'>
        <Input
          type="text"
          placeholder="Search jobs by title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" variant="orangeBlue" className="h-full sm:w-20 text-white">
          Search
        </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2'>
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State?.getStatesOfCountry("NG").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>{name}</SelectItem>
                )
              })}

            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={clearFilters} variant="ghost" className="sm:w-1/5">Clear filters</Button>
      </div>

      {
        loadingJobs && (
          <BarLoader className='mt-4' width={'100%'} color='#524f75' />
        )
      }
      {
        loadingJobs === false && (
          <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              jobs?.length ? (
                jobs.map((job) => {
                  return (
                    <JobCard key={job.id} job={job}
                      savedInit={job?.saved?.length > 0}
                    />
                  )
                })
              ) : (
                <div>No jobs found 😢</div>
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default JobListing