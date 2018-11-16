import React from 'react'

const Page = ({ title, children }) => {
    return (
        <div>
            <h2> {title} </h2>
            {children}
        </div>
    )
}
export default Page
