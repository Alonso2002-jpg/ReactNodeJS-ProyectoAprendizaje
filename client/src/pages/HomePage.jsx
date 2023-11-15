import React from 'react'
import Image from '../components/Image'
import homepic from '../assets/homepic.jpg'

const HomePage = () => {
  return (
    <div className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg max-h-96">
      <Image url={homepic}/>
    </div>
  )
}

export default HomePage