import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store';

const Navbar = () => {

    const isLoggedIn = useSelector(state => state.isLoggedIn);
    // console.log(isLoggedIn);

    const history = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(authActions.logout());
        history('/login');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary uni-padding">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Blog Store App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            isLoggedIn &&
                            <ul className='navbar-nav mx-auto'>
                                <li className='nav-item'>
                                    <Link className="nav-link active" aria-current="page" to="/blogs/addblog">Add Blog</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className="nav-link active" aria-current="page" to="/blogs">Blogs</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className="nav-link active" aria-current="page" to="/myblogs">My Blogs</Link>
                                </li>
                            </ul>
                        }
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!isLoggedIn && <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">LogIn</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
                                </li>
                            </>
                            }
                            {isLoggedIn && <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login" onClick={logout}>Logout</Link>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
