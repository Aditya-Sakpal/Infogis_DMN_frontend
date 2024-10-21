import React from 'react'

const page = () => {
  return (
    <>
      <div className='w-[100vw] h-[100vh] flex flex-wrap justify-center items-center  ' >
        <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] ' >
          <div className='w-[100%] h-[20%]  flex justify-center items-center ' >
            <h1 className='text-2xl font-semibold ' >Age Check</h1>
          </div>
          <div className='w-[100%] h-[80%] px-[5%]  flex flex-col justify-start items-center ' >
            <div className='w-[100%] h-[15%] my-[5%]  flex justify-start items-center ' >
              <label htmlFor="" className='w-[20%] flex items-center justify-center font-semibold ' >Age : </label>
              <input type="number" placeholder='Enter the age of the applicant...' className='border border-black w-[80%] rounded-3xl text-center h-[100%]' />
            </div>
            <input type="submit" className='w-[20%] h-[15%]  rounded-3xl bg-[#2596be] ' />
          </div>
        </div>
        <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] ' >
          <div className='w-[100%] h-[20%]  flex justify-center items-center ' >
            <h1 className='text-2xl font-semibold ' >Bankrutcy Check</h1>
          </div>
          <div className='w-[100%] h-[80%] px-[5%]  flex flex-col justify-start items-center ' >
            <div className='w-[100%] h-[15%] my-[5%]  flex justify-start items-center ' >
              <label htmlFor="" className='w-[20%] flex items-center justify-center font-semibold ' >Year of Occurence : </label>
              <input type="number" placeholder='Enter the year of occurence...' className='border border-black w-[80%] rounded-3xl text-center h-[100%]' />
            </div>
            <div className='w-[100%] h-[15%] my-[5%]  flex justify-start items-center ' >
              <label htmlFor="" className='w-[20%] flex items-center justify-center font-semibold ' >Amount Owed : </label>
              <input type="number" placeholder='Enter the amount owed...' className='border border-black w-[80%] rounded-3xl text-center h-[100%]' />
            </div>
            <input type="submit" className='w-[20%] h-[15%]  rounded-3xl bg-[#2596be] ' />
          </div>
        </div>
        <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] ' ></div>
        <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] ' ></div>
        <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] ' ></div>
      </div>
    </>
  )
}

export default page