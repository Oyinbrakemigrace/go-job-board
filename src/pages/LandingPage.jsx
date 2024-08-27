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
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>
          Find Your Dream Job and get Hired!
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className='flex gap-6 justify-center px-10 lg:px-0'>
        <Link to='/jobs'>
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to='/post-job'>
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      <section className="w-full py-10 space-x-10">
        <Marquee speed={130} pauseOnHover={true} className="">
          <div className='flex space-x-10 justify-center  items-center'>
            {
              companies.map((company) => {
                return <div key={company.id} className="">
                  <img src={company.path} alt={company.name} className='h-9 mx-5 sm:h-14 object-contain' />
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
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications and more.
          </CardContent>

        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage application, and fine the best candidates.
          </CardContent>
        </Card>
      </section>

      <section>
        <Accordion type="single" collapsible>
          {
            faqs.map((faq, index) => {
              return (<AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
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