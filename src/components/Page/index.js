import React from 'react'
import P from 'prop-types'

const Page = ({ title, children }) => (
  <div>
    <h2> {title} </h2>
    {children}
  </div>
)
Page.propTypes = {
  title: P.string,
  children: P.object,
}
export default Page
