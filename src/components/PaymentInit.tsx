import React from 'react'
import { NodeProps } from 'reactflow'

const PaymentInit = ({ data: { amount } }: NodeProps<{ amount: number }>) => {
    console.log("Amount in PaymentInit", amount)
    return (
        <div className='border border-violet-300 rounded-md shadow py-1 px-2 flex flex-col gap-2'>
            <div className='border-b border-b-violet-500'>
                <span className='text-xl font-semibold text-violet-500 w-full'>Payment Initialized</span>
            </div>
            <span className='text-xl font-semibold text-black'>${amount}</span>
        </div>
    )
}

export default PaymentInit