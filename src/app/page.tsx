import React from 'react'

const page = () => {
  return (
    <>
    <div className='w-[100vw] h-[100vh] flex justify-center items-center ' >
      <div className='w-[50%] h-[100%] border border-black flex flex-col justify-start items-center ' >
        <h1 className='text-2xl font-bold' >Mortgages</h1>
        <div className='w-[100%] h-[95%] border border-black ' >
        </div>
      </div>
      <div className='w-[50%] h-[100%] border border-black flex flex-col justify-start items-center ' >
        <h1 className='text-2xl font-bold'>Mortgage-process</h1>
        <div className='w-[100%] h-[95%] border border-black '></div>
      </div>
    </div>
    </>
  )
}

export default page