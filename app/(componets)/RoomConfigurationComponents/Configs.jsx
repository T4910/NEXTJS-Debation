'use client'
import React from 'react'

export default function Configs({header, content}) {
  return (
    <div className="configs" style={{backgroundColor: 'red', margin: '10px 0'}}>
        <h3>{header}</h3>
        {content}
    </div>
  )
}
