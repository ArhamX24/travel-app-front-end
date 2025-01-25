import React from 'react'

const PhoneCategoriesShimmer = () => {
  return (
    <div className='w-4/5 flex justify-around items-center'>
      <div className="skeleton h-4 w-40 mr-4 bg-slate-300"></div>
      <div className="skeleton h-4 w-40 mr-4 bg-slate-300"></div>
      <div className="skeleton h-4 w-40 mr-4 bg-slate-300"></div>
    </div>
  )
}

export default PhoneCategoriesShimmer
