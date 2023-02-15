import React from 'react'

export default function Configs({header, content}) {
  return (
    <div className="configs">
        <h3>{header}</h3>
        {content}
    </div>
  )
}
