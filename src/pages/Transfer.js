import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/index'
import { Asynchronous } from '../components/index';
import { useMutation } from '@apollo/client';
import { newTransaction } from '../graphql/mutations';
import { useSelector } from 'react-redux';


export const Transfer = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const selectedUser = useSelector(state => state.bankState.recieverId)
    const [value, setValue] = useState('');
    // eslint-disable-next-line
    const [addTransaction, { data: signupData, loading: l1, error: e1 }] = useMutation(newTransaction)

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        setValue(numericValue);
    };
    function handleSubmit(event) {
        event.preventDefault();
        addTransaction({
            variables:{
                transaction: {
                    amount: +value,
                    recieverId: selectedUser,
                    senderId: location.state
                }
            },
            onCompleted(data){
                console.log(data)
                navigate(`/results`, { state: data , replace:true});
            },
            onError(data){
                console.log(data)
                navigate(`/results`, { state: data , replace:true });
            }
        })
    }

    return (
        <div className="flex flex-col justify-evenly bg-gradient-to-r from-teal-100 to-teal-900 h-screen">
            <div className='flex justify-center'><p className='text-center font-serif text-7xl'>To</p></div>
            <div className='flex justify-center'><Asynchronous senderId={location.state}/></div>
            <div className='flex justify-center'><p className='text-center font-serif text-7xl'>Amount($)</p></div>
            <div className='flex justify-center'>
                <input type="text" // Use type="text" instead of type="number"
                    value={value}
                    onChange={handleChange}
                    pattern="[0-9]*" // Use a pattern to enforce numeric input
                    inputMode="numeric" // Use inputMode to display a numeric keyboard on mobile devices
                    required // Optionally, make the input field required
                    className="block w-1/3 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <div className='flex justify-center'>
                <button type="button" className="text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ "width": "40%" }} onClick={handleSubmit}>Transfer Money</button>
            </div>
        </div>
    )
}
