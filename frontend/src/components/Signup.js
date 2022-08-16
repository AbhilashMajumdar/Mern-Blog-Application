import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {

    const history = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = userData;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }

    const resetData = () => {
        setUserData({
            name: "",
            email: "",
            password: ""
        });
    }

    const postRequest = async () => {
        const res = await axios.post('http://localhost:5000/api/user/signup', {
            name,
            email,
            password
        }).catch((err) => {
            console.log(err);
        });
        const data = await res.data;
        return data;
    }

    const submitData = (e) => {
        e.preventDefault();
        postRequest().then((data) => window.alert(data.message)).then(() => history('/login'));
    }

    return (
        <>
            <div className="row justify-content-center my-5 pt-5">
                <div className="col-md-3 my-5 col-9">
                    <div className="form-head text-center">
                        <h1 className='mb-4'>SignUp</h1>
                    </div>
                    <form action="">
                        <div className="mb-3">
                            <input type="text"
                                name='name'
                                placeholder='Name'
                                className='form-control'
                                value={name}
                                onChange={handleInput}
                            />
                        </div>
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
                            <button type="submit" className='btn btn-primary' onClick={submitData}>SignUp</button>
                        </div>
                        <div className="redirect-login text-center mt-3">
                            <Link to='/login' style={{ "textDecoration": "none" }}><h6>Already registered? Click here for LogIn</h6></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup