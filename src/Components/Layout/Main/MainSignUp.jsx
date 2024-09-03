import { useForm } from 'react-hook-form';
import styles from './MainSignUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export function MainSignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://blog.kata.academy/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: data.username,
                        email: data.email,
                        password: data.password
                    }
                })
            });
            
            if (response.ok) {
                navigate('/sign-in');
            } else {
                const result = await response.json();
            }
    
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    const validatePasswordMatch = (value) => {
        if (value !== watch('password')) {
            return 'Passwords do not match';
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <h2 className={styles.title}>Create new account</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.label} htmlFor="username">
                Username
            </label>
            <input
                className={`${styles.input} ${errors.username ? styles.errorInput : ''}`}
                type="text"
                id="username"
                {...register('username', {
                    required: 'Username is required',
                })}
                placeholder="Username"
            />
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
            <label className={styles.label} htmlFor="email">
                Email address
            </label>
            <input
                className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                type="email"
                id="email"
                {...register('email', {
                    required: 'Email is required', // Adding an error message
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                })}
                placeholder="Email address"
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            <label className={styles.label} htmlFor="password">
                Password
            </label>
            <input
                className={`${styles.input} ${errors.password ? styles.errorInput : ''}`}
                type="password"
                id="password"
                {...register('password', {
                    required: 'Password is required', // Error message if required rule fails
                    minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
                })}
                placeholder="Password"
            />
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            <label className={styles.label} htmlFor="repeatPassword">Repeat Password</label>
            <input 
                className={`${styles.input} ${errors.repeatPassword ? styles.errorInput : ''}`}
                type="password" 
                id="repeatPassword" 
                {...register('repeatPassword', { 
                    required: 'Please repeat the password',
                    validate: validatePasswordMatch
                })}
                placeholder="Repeat Password" 
            />
            {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
            <div className={styles.checkboxContainer}>
        <input 
          className={styles.checkbox} 
          type="checkbox" 
          id="agree" 
          {...register('agree', { 
              required: 'You must agree before submitting.' 
          })}
        />
        <label 
          className={`${styles.checkboxLabel} ${errors.agree ? styles.errorLabel : ''}`} 
          htmlFor="agree"
        >
          I agree to the processing of my personal information
        </label>
      </div>
                <button className={styles.button} type="submit">Create</button>
            </form>
            <p className={styles.signInText}>
                Already have an account? <Link to='/sign-in'>Sign In.</Link>
            </p>
        </div>
    );
}