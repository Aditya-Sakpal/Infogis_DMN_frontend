"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';

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

    let apiUrl = "http://82.41.81.167:8888/kie-server/services/rest/server/containers/mortgages_1.0.0-SNAPSHOT/dmn";
    let requestData = {};

    // Step 5: Set the API URL based on the card title
    switch (title) {
      case "Age Check":
        requestData = {
          "model-namespace": "https://kiegroup.org/dmn/_F0C8AA2C-3852-4024-9F15-F04830DBF4DC",
          "model-name": "new_dmn_model",
          "decision": "Age Approval",
          "dmn-context": {
            "Age": parseInt(formData.age,10)
          }
        };
        break;
      case "Bankruptcy Check":
        requestData = {
          "model-namespace": "https://kiegroup.org/dmn/_F0C8AA2C-3852-4024-9F15-F04830DBF4DC",
          "model-name": "new_dmn_model",
          "decision": "Bankruptcy Approval",
          "dmn-context": {
            "YearOfOccurence": parseInt(formData.yearOfOccurence,10),
            "AmountOwed": parseInt(formData.amountOwed,10)
          }
        };
        break;
      case "Credit Rating Check":
        requestData = {
          "model-namespace": "https://kiegroup.org/dmn/_F0C8AA2C-3852-4024-9F15-F04830DBF4DC",
          "model-name": "new_dmn_model",
          "decision": "CreditRating Approval",
          "dmn-context": {
            "CreditRating": formData.creditRating
          }
        };
        break;
      case "Mortgages Check":
        requestData = {
          "model-namespace": "https://kiegroup.org/dmn/_F0C8AA2C-3852-4024-9F15-F04830DBF4DC",
          "model-name": "new_dmn_model",
          "decision": "Main Approval",
          "dmn-context": {
            "Age Approval": formData.ageApproval,
            "CreditRating Approval": formData.creditRatingApproval,
            "Bankruptcy Approval": formData.bankruptcyApproval
          }
        };
        break;
      case "Mortgages-Process Check":
        apiUrl="http://82.41.81.167:8888/kie-server/services/rest/server/containers/mortgage-process_1.0.0-SNAPSHOT/dmn";
        requestData = {
          "model-namespace": "https://kiegroup.org/dmn/_81B3F457-87AE-481A-8877-14391D242E93",
          "model-name": "MorgateProcess_DMN",
          "decision": "Mortgage Amount",
          "dmn-context": {
            "Applicant Annual Income": parseInt(formData.annualIncome, 10), // Convert to integer
            "Property Sales Price": parseInt(formData.propertySalesPrice, 10), // Convert to integer
            "Property Age": parseInt(formData.propertyAge, 10),
            "Property Location": formData.propertyLocation
          }
        };
        break;
      default:
        console.error("Unknown card title");
        return;
    }

    // Step 6: Make the API call
    try {
      console.log(requestData)
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(proxyUrl + apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic cmFkbWluOnJhZG1pbjU2NyE=',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
        mode: 'cors'
      });
      const result = await response.json();
      console.log(result)
      const answer = result.result['dmn-evaluation-result']['dmn-context'][`${requestData?.decision}`];
      console.log(answer);
      Swal.fire({
        title: 'Decision Result',
        text: `${requestData.decision}: ${answer}`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
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
