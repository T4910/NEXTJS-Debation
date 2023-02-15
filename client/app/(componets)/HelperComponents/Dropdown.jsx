import React from 'react'
import Link from 'next/link'

const styles = {
    list_style_type: 'none'
}

const Dropdown = ({main, list}) => {
    return (
        <div className="dropdown">
            <div className="dropdown-header">{main}</div>
            <ul>
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