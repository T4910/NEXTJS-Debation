import React from 'react'
import Dropdown from './Dropdown'

export default function DropdownList({ list }) {
  return (
    <>          
        {
            list.map((item) => {
                return <Dropdown 
                    main={item.dropdownname}
                    list = {item.dropdownlist}
                />
            })
        }
    </>
  )
}
