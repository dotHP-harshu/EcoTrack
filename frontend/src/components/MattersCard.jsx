import React from 'react'

function MattersCard({title, bg, heading, paragraph}) {
  return (
    <div 
      className='max-w-sm rounded-2xl p-6 justify-self-center transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border border-white/30 backdrop-blur-sm' 
      style={{backgroundColor: `${bg}`}}
    >
      <h4 className='text-xl font-sora font-medium text-text-heading mb-2'>{title}</h4>
      <h3 className='text-2xl font-sora font-bold text-text-heading mb-3'>{heading}</h3>
      <p className='text-base text-text-light font-open-sans leading-relaxed'>{paragraph}</p>
    </div>
  )
}

export default MattersCard