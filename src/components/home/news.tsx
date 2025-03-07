import React from 'react'
import NewsCarousel from './news-carousel'

const News = () => {
  return (
    <div className='flex relative flex-col justify-center items-center h-screen px-32 py-16 space-y-20'>
        <h1 className='text-6xl font-black text-center max-lg:text-5xl max-md:text-4xl max-sm:text-xl text-[#082A98] z-10'>
            Kabar KerjaIn
        </h1>
        <div className='w-full flex justify-center z-10'>
            <NewsCarousel />
        </div>
    </div>
  )
}

export default News