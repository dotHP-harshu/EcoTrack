import React from 'react'

const colors = [
  {
    bg: "#F0F4FF",
    text: "#3730A3",
    border: "#C7D2FE"
  },
  {
    bg: "#FEFDF3",
    text: "#713F12",
    border: "#FDE68A"
  },
  {
    bg: "#F1FCF5",
    text: "#166534",
    border: "#BBF7D0"
  },
  {
    bg: "#FDF7FB",
    text: "#9D174D",
    border: "#FBCFE8"
  },
  {
    bg: "#F5FBFF",
    text: "#075985",
    border: "#BAE6FD"
  },
  {
    bg: "#F7FEFF",
    text: "#155E75",
    border: "#A5F3FC"
  },
  {
    bg: "#F9F5FF",
    text: "#5B21B6",
    border: "#DDD6FE"
  },
  {
    bg: "#FFF6F0",
    text: "#9A3412",
    border: "#FDBA74"
  }
];

function HomeTipCard({tags, index, paragraph}) {
  return (
    <div 
      className="max-w-2xs p-5 h-fit rounded-2xl justify-self-center transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md border border-white/40" 
      style={{backgroundColor:`${colors[index].bg}`}}
    >
      <div className='flex flex-wrap gap-2 mb-4'>
        {tags.map((t, i) => (
          <span
            style={{backgroundColor:`${colors[index].text}`, borderColor:`${colors[index].border}`}}
            className="text-sm border-2 text-white font-sora font-medium rounded-full px-3 py-1 shadow-sm"
            key={i}
          >
            {t}
          </span>
        ))}
      </div>
      <p className="text-base text-center font-open-sans leading-relaxed text-text">{paragraph}</p>
    </div>
  );
}

export default HomeTipCard