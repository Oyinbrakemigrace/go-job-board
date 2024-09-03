import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import Marquee from 'react-fast-marquee'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <div className='flex flex-col items-center justify-center text-zinc-700 text-3xl font-extrabold sm:text-6xl lg:text-7xl lg:tracking-tight lg:leading py-4'>
          <h1>Discover Your <span className='gradient-title w-full'>Ideal Job </span>and Secure Your Next Opportunity!</h1>
        </div>
        <p className='text-zinc-500 sm:mt-4 text-xs sm:text-xl'>
          Explore a vast range of job listings or connect with the perfect candidate.
        </p>
      </section>
      <div className='lg:flex lg:flex-row flex-col lg:gap-6 justify-center px-10 lg:px-0'>
        <Link to='/jobs'>
          <Button variant="orangeBlue" className="text-white lg:mb-0 mb-5 w-full mx-auto" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to='/post-job'>
          <Button variant="oneTime" className="w-full mx-auto"  size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      <section className="w-full py-10">
        <Marquee speed={100} pauseOnHover={true}>
          <div className='flex space-x-10 justify-center items-center'>
            {
              companies.map((company) => {
                return <div key={company.id}>
                  <img src={company.path} alt={company.name} className='h-8 mx-5 sm:h-14 object-contain' />
                </div>
              })
            }
          </div>
        </Marquee>
      </section>

      <img src="/banner.jpg" alt="" className='w-full' />

      <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className="text-zinc-100">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-200">
            Search and apply for jobs, track applications and more.
          </CardContent>

        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-zinc-100">For Employers</CardTitle>
          </CardHeader>
          <CardContent className="text-zinc-200">
            Post jobs, manage application, and find the best candidates for your jobs.
          </CardContent>
        </Card>
      </section>

      <section>
        <h3 className='gradient-title text-center font-semibold lg:text-5xl text-4xl pb-5'>Frequently asked questions</h3>
        <Accordion type="single" collapsible>
          {
            faqs.map((faq, index) => {
              return (<AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-zinc-600">{faq.question}</AccordionTrigger>
                <AccordionContent className="gradient-title font-semibold">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)
            })
          }
        </Accordion>

      </section>
    </main>
  )
}

export default LandingPage