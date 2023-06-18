import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'

export const Home = ({ title }) => {
  const navigate = useNavigate()
  useTitle(title)
  const handleSubmit = (event) => {
    event.preventDefault();
    return navigate(`/customers`);
  }
  return (
    <div className="flex flex-col justify-evenly bg-gradient-to-r from-teal-100 to-teal-900 h-screen">
      <div className='flex justify-center'><p className='text-center font-serif text-7xl'>Banking System</p></div>
      <div className='flex justify-center'>
        <button type="button" className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ "width": "40%" }} onClick={handleSubmit} >Transfer Money</button>
      </div>
    </div>
  )
}
