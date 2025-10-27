import React from 'react'

const ContainerLayout = ({ children }) => {
    return (
        <main className='container mx-auto font-poppins px-4 sm:px-8'>
            {children}
        </main>
    )
}

export default ContainerLayout