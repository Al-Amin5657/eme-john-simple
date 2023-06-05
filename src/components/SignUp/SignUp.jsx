import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)

        setError('')

        if (password !== confirm) {
            setError('Password did not match');
            return;
        }
        else if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                console.log(error);
                setError(error.massage)
            })
    }
    return (
        <div className='from-info'>
            <div className='form-container'>
                <h2 className='form-title'>Sign up</h2>
                <form onSubmit={handleSignUp}>
                    <div className='form-control'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name="confirm" required />
                    </div>
                    <input className='btn-submit' type="submit" value="Sign up" />
                </form>
                <p><small className='account'>Already have an account? <Link to="/login">Login</Link></small></p>
                <p className='text-error'>{error}</p>
            </div>
        </div>
    );
};

export default SignUp;