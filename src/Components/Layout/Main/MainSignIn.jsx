import { useForm } from 'react-hook-form';
import styles from './MainSignIn.module.scss';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../Entities/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function MainSignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, isLoading, isError, errorMessage } = useSelector((state) => state.user);

    const onSubmit = (userData) => {
        dispatch(loginUser(userData));
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.title}>Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)}> {/* Используем handleSubmit от react-hook-form */}
                <label className={styles.label} htmlFor="email">Email address</label>
                <input 
                    className={styles.input} 
                    type="email" 
                    id="email" 
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' }
                    })} 
                    placeholder="Email address" 
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}

                <label className={styles.label} htmlFor="password">Password</label>
                <input 
                    className={styles.input} 
                    type="password" 
                    id="password" 
                    {...register('password', { required: 'Password is required' })} 
                    placeholder="Password" 
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}

                <button className={styles.button} type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {isError && <p className={styles.error}>{errorMessage}</p>}
            <p className={styles.signUpText}>
                Don't have an account? <Link to='/sign-up'>Sign Up.</Link>
            </p>
        </div>
    );
}