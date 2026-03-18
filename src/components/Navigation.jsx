import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;