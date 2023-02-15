'use client'
import React from 'react'
import Link from 'next/link'

const styles = {
    list_style_type: 'none'
}

const Dropdown = ({main, list}) => {
    let [ShowDropdown, setShowDropdown] = React.useState(false)

    return (
        <div className="dropdown">
            <div 
            onClick={() => setShowDropdown(!ShowDropdown)}
            className="dropdown-header">{main}*</div>

            <ul style={{display: (ShowDropdown) ? 'block' : 'none'}}>
                {list.map((item) => 
                    <li key={item.id}>
                        <Link href={item.url}>
                            {item.name}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
)
}
export default Dropdown