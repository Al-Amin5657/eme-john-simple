import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';

    const handleSignIn = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);


        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })

    }


    return (
        <div className='from-info'>
            <div className='form-container'>
                <h2 className='form-title'>Login</h2>
                <form onSubmit={handleSignIn}>
                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input type={show ? 'text' : 'password'} name="password" required />
                        <p onClick={() => setShow(!show)}><small>
                            {
                                show ? <span>Hide password</span> : <span>Show Password</span>
                            }
                        </small></p>
                    </div>
                    <input className='btn-submit' type="submit" value="Login" />
                </form>
                <p><small className='account'>New to ema-john? <Link to="/signup">Create new account</Link></small></p>
            </div>
        </div>
    );
};

export default Login;