"use client"
import React, { useState } from 'react';

const Card = ({ title, inputs, gradient, buttonBgColor, buttonHoverColor, handleChange, formData, handleSubmit }) => {
  return (
    <div className='w-[25%] h-[40%] shadow-2xl rounded-xl m-[2%] transition-all duration-300 hover:shadow-xl'>
      <div className={`w-[100%] h-[20%] ${gradient} flex justify-center items-center rounded-t-xl`}>
        <h1 className='text-2xl font-semibold text-white'>{title}</h1>
      </div>
      <form className='w-[100%] h-[80%] px-[5%] flex flex-col justify-start items-center' onSubmit={(e) => handleSubmit(e, title)}>
        {inputs.map((input, index) => (
          <div key={index} className='w-[100%] h-[14%] my-[1.5%] flex justify-center items-center'>
            {input.type === 'boolean' ? (
              <select
                className='border border-gray-300 w-[80%] rounded-3xl text-center h-[100%] bg-white'
                value={formData[input.name] !== undefined ? formData[input.name] : ''}
                onChange={(e) => handleChange(e, input.name, input.type)}
              >
                <option value="" disabled>{input.placeholder}</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            ) : (
              <input
                type={input.type}
                placeholder={input.placeholder}
                className='border border-gray-300 w-[80%] rounded-3xl text-center h-[100%]'
                value={formData[input.name] || ''}
                onChange={(e) => handleChange(e, input.name, input.type)}
              />
            )}
          </div>
        ))}
        <input
          type="submit"
          value="Submit"
          className={`w-[30%] h-[15%] mt-[1%] cursor-pointer rounded-3xl ${buttonBgColor} text-white hover:${buttonHoverColor}`}
        />
      </form>
    </div>
  );
};

const Page = () => {
  const commonGradient = 'bg-gradient-to-r from-cyan-500 to-blue-500';
  const buttonBgColor = 'bg-blue-500';
  const buttonHoverColor = 'bg-blue-700';

  // Step 2: Initialize state for form data
  const [formData, setFormData] = useState({
    age: '',
    yearOfOccurence: '',
    amountOwed: '',
    creditRating: '',
    annualIncome: '',
    propertySalesPrice: '',
    propertyAge: '',
    propertyLocation: '',
    ageApproval: '',
    creditRatingApproval: '',
    bankruptcyApproval: ''
  });

  // Step 3: Handle input change
  const handleChange = (e, name, type) => {
    const value = type === 'boolean' ? (e.target.value === 'true') : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  // Step 4: Handle form submission
  const handleSubmit = async (e, title) => {
    e.preventDefault();

    let apiUrl = '';
    let requestData = {};

    // Step 5: Set the API URL based on the card title
    switch (title) {
      case "Age Check":
        console.log(formData.age)
        apiUrl = "https://82.41.81.167:8888/kie-server/services/rest/server/containers/mortgages_1.0.0-SNAPSHOT/dmn"; // Replace with actual API URL
        requestData = {
          age: formData.age
        };
        break;
      case "Bankruptcy Check":
        apiUrl = "/api/bankruptcy-check"; // Replace with actual API URL
        requestData = {
          yearOfOccurence: formData.yearOfOccurence,
          amountOwed: formData.amountOwed
        };
        break;
      case "Credit Rating Check":
        apiUrl = "/api/credit-rating-check"; // Replace with actual API URL
        requestData = {
          creditRating: formData.creditRating
        };
        break;
      case "Mortgages Check":
        apiUrl = "/api/mortgages-check"; // Replace with actual API URL
        requestData = {
          ageApproval: formData.ageApproval,
          creditRatingApproval: formData.creditRatingApproval,
          bankruptcyApproval: formData.bankruptcyApproval
        };
        break;
      case "Mortgages-Process Check":
        apiUrl = "/api/mortgages-process-check"; // Replace with actual API URL
        requestData = {
          annualIncome: formData.annualIncome,
          propertySalesPrice: formData.propertySalesPrice,
          propertyAge: formData.propertyAge,
          propertyLocation: formData.propertyLocation
        };
        break;
      default:
        console.error("Unknown card title");
        return;
    }

    // Step 6: Make the API call
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const cardData = [
    {
      title: "Age Check",
      inputs: [{ type: 'number', placeholder: 'Enter the age of the applicant...', name: 'age' }],
    },
    {
      title: "Bankruptcy Check",
      inputs: [
        { type: 'number', placeholder: 'Enter the year of occurrence...', name: 'yearOfOccurence' },
        { type: 'number', placeholder: 'Enter the amount owed...', name: 'amountOwed' }
      ],
    },
    {
      title: "Credit Rating Check",
      inputs: [{ type: 'text', placeholder: 'Enter your credit rating...', name: 'creditRating' }],
    },
    {
      title: "Mortgages Check",
      inputs: [
        { type: 'boolean', placeholder: 'Enter Age Approval...', name: 'ageApproval' },
        { type: 'boolean', placeholder: 'Enter Credit Rating Approval...', name: 'creditRatingApproval' },
        { type: 'boolean', placeholder: 'Enter Bankruptcy Approval...', name: 'bankruptcyApproval' }
      ],
    },
    {
      title: "Mortgages-Process Check",
      inputs: [
        { type: 'number', placeholder: 'Enter your annual income...', name: 'annualIncome' },
        { type: 'number', placeholder: 'Enter your property sales price...', name: 'propertySalesPrice' },
        { type: 'number', placeholder: 'Enter property age...', name: 'propertyAge' },
        { type: 'text', placeholder: 'Enter property location...', name: 'propertyLocation' }
      ],
    },
  ];

  return (
    <div className='w-[100vw] h-[100vh] flex flex-wrap justify-center items-center'>
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          inputs={card.inputs}
          gradient={commonGradient}
          buttonBgColor={buttonBgColor}
          buttonHoverColor={buttonHoverColor}
          handleChange={handleChange}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      ))}
    </div>
  );
};

export default Page;
