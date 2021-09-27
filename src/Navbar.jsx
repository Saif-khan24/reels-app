import { auth } from "./firebase";
import { Link } from 'react-router-dom';
import './Navbar.css';

let Navbar = ()=>{

    return (
        <>
            <div className="navbar">
                <div className="navbar-logo">Instagram</div>
                <div className="navbar-searchBox">
                    <input className="navbar-input" placeholder="search" disabled />
                </div>
                <div className="navbar-end">
                    <Link to="/home">
                        <li><span className="material-icons-outlined home">home</span></li>
                    </Link>

                    <button className="logout-btn"
                     onClick={()=>{
                         if(!window.confirm('Are you sure to logout')){
                            return;
                         } 

                        auth.signOut()        //for log out
                    }}
                    >
                        Logout</button>
                    <li><span className="material-icons-outlined logout-btn2">logout</span></li>
                </div>
            </div>
        </>
    )
}
export default Navbar;