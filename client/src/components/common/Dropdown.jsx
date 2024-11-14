import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import "../../css/navbar.css";
import { Link } from 'react-router-dom'


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
                key={childlink}
                className='nav-dropdown-item'    
            ><Link to={`/${childlink.toLowerCase()}`}> {childlink}</Link></NavDropdown.Item>
            ))}
        </NavDropdown>
    )
}

export default Dropdown