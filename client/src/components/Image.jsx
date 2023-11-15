import React from 'react'

const Image = ({url}) => {
  return (
    <img src={url} alt="400" className='object-cover object-bottom max-h-full'/>
  )
}

export default Image