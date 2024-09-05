import React from 'react'

const Heading = ({title}) => {
  return (
      <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl mt-8 lg:mt-0 text-center pb-8'>{title}</h1>
  )
}

export default Heading