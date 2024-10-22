import React, { useState } from 'react'

const Card = ({ title, inputs, gradient, buttonBgColor, buttonHoverColor }) => {
  
  return (
    <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] transition-all duration-300 hover:shadow-xl'>
      <div className={`w-[100%] h-[20%] ${gradient} flex justify-center items-center rounded-t-xl`}>
        <h1 className='text-2xl font-semibold text-white'>{title}</h1>
      </div>
      <div className='w-[100%] h-[80%] px-[5%] flex flex-col justify-start items-center'>
        {inputs.map((input, index) => (
          <div key={index} className='w-[100%] h-[14%] my-[1.5%] flex justify-center items-center'>
            <input
              type={input.type}
              placeholder={input.placeholder}
              className='border border-gray-300 w-[80%] rounded-3xl text-center h-[100%]'
            />
          </div>
        ))}
        <input
          type="submit"
          className={`w-[30%] h-[15%] mt-[1%] cursor-pointer rounded-3xl ${buttonBgColor} text-white hover:${buttonHoverColor}`}
        />
      </div>
    </div>
  );
};


const page = () => {

  const commonGradient = 'bg-gradient-to-r from-cyan-500 to-blue-500';
  const buttonBgColor = 'bg-blue-500';
  const buttonHoverColor = 'bg-blue-700';
  
  

  const cardData = [
    {
      title: "Age Check",
      inputs: [{ type: 'number', placeholder: 'Enter the age of the applicant...',name:'age',function:'setAge' }],
    },
    {
      title: "Bankruptcy Check",
      inputs: [
        { type: 'number', placeholder: 'Enter the year of occurrence...',name:'yearOfOccurence',function:'setYearOfOccurence' },
        { type: 'number', placeholder: 'Enter the amount owed...',name:'amountOwed',function:'setAmountOwed' }
      ],
    },
    {
      title: "Credit Rating Check",
      inputs: [{ type: 'text', placeholder: 'Enter your credit rating...',name:'creditRating',function:'setCreditRating'}],
    },
    {
      title: "Mortgages Check",
      inputs: [
        { type: 'boolean', placeholder: 'Enter age approval...' },
        { type: 'boolean', placeholder: 'Enter CreditRating approval...' },
        { type: 'boolean', placeholder: 'Enter Bankruptcy approval...' }
      ],
    },
    {
      title: "Mortgages-Process Check",
      inputs: [
        { type: 'number', placeholder: 'Enter your annual income...',name:'annualIncome',function:'setAnnualIncome' },
        { type: 'number', placeholder: 'Enter your property sales price...',name:'propertySalesPrice',function:'setPropertySalesPrice' },
        { type: 'number', placeholder: 'Enter property age...',name:'propertyAge',function:'setPropertyAge' },
        { type: 'text', placeholder: 'Enter property location...',name:'propertyLocation',function:'setProperty'}
      ],
    },
  ];

  return (
    <>
      <div className='w-[100vw] h-[100vh] flex flex-wrap justify-center items-center  ' >
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            inputs={card.inputs}
            gradient={commonGradient}
            buttonBgColor={buttonBgColor}
            buttonHoverColor={buttonHoverColor}
          />
        ))}
      </div>
    </>
  )
}

export default page