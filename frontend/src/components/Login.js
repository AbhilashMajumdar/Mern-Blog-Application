import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Login = () => {

    const dispatch = useDispatch();

    const history = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = userData;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const resetData = () => {
        setUserData({
            email: "",
            password: ""
        });
    }

    const postRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/user/login', {
            email,
            password
        }).catch((err) => {
            console.log(err);
        });
        const data = await res.data;
        // console.log(data);
        return data;
    }

    const submitData = (e) => {
        e.preventDefault();
        postRequest().then((data)=>localStorage.setItem('userId', data.user._id)).then(() => history('/blogs')).then(()=>dispatch(authActions.login()));
    }

  return (
    <>
        <div className="row justify-content-center my-5 pt-5">
            <div className="col-md-3 my-5 col-9">
                <div className="form-head text-center">
                    <h1 className='mb-4'>LogIn</h1>
                </div>
                <form action="">
                    <div className="mb-3">
                        <input type="email"
                            name='email'
                            placeholder='Email'
                            className='form-control'
                            value={email}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-4">
                        <input type="password"
                            name='password'
                            placeholder='Password'
                            className='form-control'
                            value={password}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="my-3 text-center">
                        <button className='btn btn-danger mx-3' onClick={resetData}>Reset</button>
                        <button className='btn btn-primary' onClick={submitData}>LogIn</button>
                    </div>
                    <div className="redirect-login text-center mt-3">
                        <Link to='/signup' style={{"textDecoration" : "none"}}><h6>New User? Click here for SignUp</h6></Link>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login