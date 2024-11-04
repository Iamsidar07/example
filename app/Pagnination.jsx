"use client"
import React, { useMemo, useState } from 'react'
const NUM_OF_ITEMS_IN_ONE_PAGE = 10
const Pagnination = ({stories}) => {
  const [startIndex, setStartIndex] = useState(0)
  const numOfPage = useMemo(()=>stories.length / NUM_OF_ITEMS_IN_ONE_PAGE, [stories])
  return (
    <div className='pt-96'>
      {stories?.slice(startIndex, startIndex + NUM_OF_ITEMS_IN_ONE_PAGE).map((s)=><p key={s.id}>{s}</p>)}
      {new Array(numOfPage).fill(0).map((n, i)=><button key={i} onClick={()=>setStartIndex(i * NUM_OF_ITEMS_IN_ONE_PAGE)} className='border p-5'>{i + 1}</button>)}
    </div>
  )
}

export default Pagnination