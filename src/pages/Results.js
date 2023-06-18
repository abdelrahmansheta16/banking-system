import React from 'react'
import succesIcon from '../assets/images/success-icon-23194.png'
import failIcon from '../assets/images/failed-icon-7.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
export const Results = () => {
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location.state)
    const handleSubmit = (event) => {
        navigate('/')
    }
    return (
        <div className='flex flex-col justify-center h-screen'>
            <div className='flex justify-center'>
                <img src={location.state.addTransaction ? succesIcon : failIcon} alt="transaction successful" style={{ 'width': '20%' }} />
            </div>
            {location.state.addTransaction ?
                <>
                    <div className='flex justify-center'><p>Successful Transaction</p></div>
                    <div className='flex justify-center'><p>Transaction ID: {location.state.addTransaction.id}</p></div>
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-evenly'>
                            <div style={{ 'width': '10%' }}>
                                <p>from</p>
                            </div>
                            <div style={{ 'width': '10%' }}>
                                <p>{location.state.addTransaction.senderId}</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-evenly'>
                            <div style={{ 'width': '10%' }}>
                                <p>to</p>
                            </div>
                            <div style={{ 'width': '10%' }}>
                                <p>{location.state.addTransaction.recieverId}</p>
                            </div>
                        </div>
                        <div className='flex flex-row justify-evenly'>
                            <div style={{ 'width': '10%' }}>
                                <p>amount</p>
                            </div>
                            <div style={{ 'width': '10%' }}>
                                <p>{location.state.addTransaction.amount}$</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type="button" className="w-1/3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 m-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSubmit}>Return to Home Page</button>
                    </div>
                </> :
                <>
                    <div className='flex justify-center'><p>Insufficient Funds</p></div>
                    <div className='flex justify-center'>
                        <button type="button" className="w-1/3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-10 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={handleSubmit}>Return to Home Page</button>
                    </div>
                </>
            }


        </div>
    )
}
