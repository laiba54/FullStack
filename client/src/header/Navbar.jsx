import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Navbar = ({ profile, name }) => {
    const navigate = useNavigate();

    const handleLogoutFunction = async(e) =>{
        e.preventDefault(); 
        try {
            await axios.post('https://full-stack-server-two.vercel.app/logout', {}, { withCredentials: true });

            //localStorage.removeItem('authToken');
            //document.cookie = 'uid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';

            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return ( 
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                <div className="d-flex align-items-center ms-lg-4 ms-md-0 ms-sm-0">
                     {profile && (
                       <img
                         src={`https://full-stack-server-two.vercel.app/uploads/${profile}`}
                         width={40}
                         height={40}
                         style={{ borderRadius: '50%' }}
                         alt="Profile"
                         className="me-2"
                       />
                     )}
                     {name && <span className="text-dark fw-semibold fs-5">{name}</span>}
                   </div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5 ms-md-0 ms-sm-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">User</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                    <button className="btn btn-outline-danger px-4" onClick={handleLogoutFunction} type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
 
export default Navbar;
