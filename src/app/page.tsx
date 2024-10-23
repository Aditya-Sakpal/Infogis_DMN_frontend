"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';

interface InputField {
  type: 'number' | 'text' | 'boolean';
  placeholder: string;
  name: string;
  [key: string]: string | number | boolean;
}

interface CardProps {
  title: string;
  inputs: InputField[];
  gradient: string;
  buttonBgColor: string;
  buttonHoverColor: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string, type: 'number' | 'text' | 'boolean') => void;
  formData: { [key: string]: string | number | boolean };
  handleSubmit: (e: FormEvent, title: string) => void;
}

const Card: React.FC<CardProps> = ({ title, inputs, gradient, buttonBgColor, buttonHoverColor, handleChange, formData, handleSubmit }) => {
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
                value={formData[input.name] !== undefined ? String(formData[input.name]) : ''}
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
                value={formData[input.name] !== undefined ? String(formData[input.name]) : ''}
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

const Page: React.FC = () => {
  const commonGradient = 'bg-gradient-to-r from-cyan-500 to-blue-500';
  const buttonBgColor = 'bg-blue-500';
  const buttonHoverColor = 'bg-blue-700';

  interface FormData {
    age: string;
    yearOfOccurence: string;
    amountOwed: string;
    creditRating: string;
    annualIncome: string;
    propertySalesPrice: string;
    propertyAge: string;
    propertyLocation: string;
    ageApproval: string;
    creditRatingApproval: string;
    bankruptcyApproval: string;
    [key: string]: string | number | boolean;
  }

  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, name: string, type: 'number' | 'text' | 'boolean') => {
    const value = type === 'boolean' ? (e.target.value === 'true') : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent, title: string) => {
    e.preventDefault();

    let apiUrl = process.env.NEXT_PUBLIC_MORTGAGE_URL;
    let requestData: any = {};

    switch (title) {
      case "Age Check":
        requestData = {
          "model-namespace": process.env.NEXT_PUBLIC_MORTGAGE_NAMESPACE,
          "model-name": process.env.NEXT_PUBLIC_MORTGAGE_MODEL,
          "decision": "Age Approval",
          "dmn-context": {
            "Age": parseInt(formData.age, 10)
          }
        };
        break;
      case "Bankruptcy Check":
        requestData = {
          "model-namespace": process.env.NEXT_PUBLIC_MORTGAGE_NAMESPACE,
          "model-name": process.env.NEXT_PUBLIC_MORTGAGE_MODEL,
          "decision": "Bankruptcy Approval",
          "dmn-context": {
            "YearOfOccurence": parseInt(formData.yearOfOccurence, 10),
            "AmountOwed": parseInt(formData.amountOwed, 10)
          }
        };
        break;
      case "Credit Rating Check":
        requestData = {
          "model-namespace": process.env.NEXT_PUBLIC_MORTGAGE_NAMESPACE,
          "model-name": process.env.NEXT_PUBLIC_MORTGAGE_MODEL,
          "decision": "CreditRating Approval",
          "dmn-context": {
            "CreditRating": formData.creditRating
          }
        };
        break;
      case "Mortgages Check":
        requestData = {
          "model-namespace": process.env.NEXT_PUBLIC_MORTGAGE_NAMESPACE,
          "model-name": process.env.NEXT_PUBLIC_MORTGAGE_MODEL,
          "decision": "Main Approval",
          "dmn-context": {
            "Age Approval": formData.ageApproval === 'true',
            "CreditRating Approval": formData.creditRatingApproval === 'true',
            "Bankruptcy Approval": formData.bankruptcyApproval === 'true'
          }
        };
        break;
      case "Mortgages-Process Check":
        apiUrl = process.env.NEXT_PUBLIC_MORTGAGE_PROCESS_URL;
        requestData = {
          "model-namespace": process.env.NEXT_PUBLIC_MORTGAGE_PROCESS_NAMESPACE,
          "model-name": process.env.NEXT_PUBLIC_MORTGAGE_PROCESS_MODEL,
          "decision": "Mortgage Amount",
          "dmn-context": {
            "Applicant Annual Income": parseInt(formData.annualIncome, 10),
            "Property Sales Price": parseInt(formData.propertySalesPrice, 10),
            "Property Age": parseInt(formData.propertyAge, 10),
            "Property Location": formData.propertyLocation
          }
        };
        break;
      default:
        console.error("Unknown card title");
        return;
    }

    try {
      console.log(requestData, apiUrl);
      const proxyUrl = `${process.env.NEXT_PUBLIC_PROXY_URL}`;
      const response = await fetch(proxyUrl + apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
        mode: 'cors'
      });
      const result = await response.json();
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

  const cardData: { title: string; inputs: InputField[] }[] = [
    {
      title: "Age Check",
      inputs: [{ type: 'number', placeholder: 'Enter the age of the applicant...', name: 'age' }]
    },
    {
      title: "Bankruptcy Check",
      inputs: [
        { type: 'number', placeholder: 'Enter the year of occurrence...', name: 'yearOfOccurence' },
        { type: 'number', placeholder: 'Enter the amount owed...', name: 'amountOwed' }
      ]
    },
    {
      title: "Credit Rating Check",
      inputs: [{ type: 'text', placeholder: 'Enter your credit rating...', name: 'creditRating' }]
    },
    {
      title: "Mortgages Check",
      inputs: [
        { type: 'boolean', placeholder: 'Enter Age Approval...', name: 'ageApproval' },
        { type: 'boolean', placeholder: 'Enter Credit Rating Approval...', name: 'creditRatingApproval' },
        { type: 'boolean', placeholder: 'Enter Bankruptcy Approval...', name: 'bankruptcyApproval' }
      ]
    },
    {
      title: "Mortgages-Process Check",
      inputs: [
        { type: 'number', placeholder: 'Enter the applicant annual income...', name: 'annualIncome' },
        { type: 'number', placeholder: 'Enter the property sales price...', name: 'propertySalesPrice' },
        { type: 'number', placeholder: 'Enter the property age...', name: 'propertyAge' },
        { type: 'text', placeholder: 'Enter the property location...', name: 'propertyLocation' }
      ]
    }
  ];

  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
      <div className='w-[95%] h-[100%] flex flex-row flex-wrap justify-center items-center'>
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
    </div>
  );
};

export default Page;
