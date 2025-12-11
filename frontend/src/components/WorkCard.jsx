import React from 'react'

function WorkCard({step, bg, paragraph, heading}) {
  return (
    <div className='w-full max-w-sm flex p-6 rounded-2xl justify-center items-center flex-col gap-4 justify-self-center bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100'> 
      <div className='w-full max-h-[200px] overflow-hidden flex justify-center items-center rounded-xl'>
        <img 
          src={`/images/hiw-${step}.png`} 
          alt={step} 
          className='h-full object-center aspect-square rounded-xl transition-transform duration-300 hover:scale-110' 
        />
      </div>
      <div className='w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-xl font-sora shadow-lg'>
        {step}
      </div>
      <h3 className='text-2xl font-sora font-bold text-center text-text-heading'>{heading}</h3>
      <p className='text-base text-text-light text-center font-open-sans leading-relaxed'>{paragraph}</p>
    </div>
  )
}

export default WorkCard