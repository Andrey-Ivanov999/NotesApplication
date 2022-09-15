import {NavLink} from "react-router-dom";
function Header() {
    return (
        <div className="menu">
            <nav className="navigation">
                <ul className="list">
                    <li><NavLink exact className="" to="/">Home</NavLink></li>
                    <li><NavLink  className="" to="/note">Note</NavLink></li>
                    <li><NavLink  className="" to="/create">Create</NavLink></li>
                    <li><NavLink  className="" to="/about">About</NavLink></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;