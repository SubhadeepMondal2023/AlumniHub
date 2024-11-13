import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import "../../css/navbar.css"


const Dropdown = ({navlink,childlinks}) => {
    return (
        <NavDropdown
            id="nav-dropdown-dark-example"
            title={navlink}
            menuVariant="dark"
            className="nav-dropdown-menu"
        >
            {childlinks.map((childlink) => (
                <NavDropdown.Item 
                href={childlink.toLowerCase()}
                className='nav-dropdown-item'    
            >{childlink}</NavDropdown.Item>
            ))}
        </NavDropdown>
    )
}

export default Dropdown