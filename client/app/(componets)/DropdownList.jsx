import Dropdown from './Dropdown'

export default function DropdownList({ list }) {
  return (
    <>          
        {
            list.map((item, index) =>
                <Dropdown 
                    key={index}
                    main={item.dropdownname}
                    list = {item.dropdownlist}
                />
            )
        }
    </>
  )
}
