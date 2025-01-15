import React from 'react';
import {Link} from 'react-router-dom';

const NavBar=()=>{
    return (
        <nav className='navbar'>
            <div className='navigation'>

                <ul className="listInline">
                    <li className="listInline"><Link to="/">Home</Link></li>
                    |&nbsp;

                    <li className="listInline"><Link to="/patients">Patients</Link></li>
                    |&nbsp;
                    <li className="listInline"><Link to="/diseases">Diseases</Link></li> |&nbsp;
                    <li className="listInline"><Link to="/disease">Add New Disease</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;