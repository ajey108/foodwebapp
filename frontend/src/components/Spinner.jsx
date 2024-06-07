import React from 'react'

const Spinner = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary' style={{ borderTopColor: 'transparent' }}></div>
        </div>
    )
}

export default Spinner
