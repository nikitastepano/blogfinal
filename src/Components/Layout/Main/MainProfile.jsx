import { useForm } from 'react-hook-form';
import styles from './MainProfile.module.scss';
import { useSelector } from 'react-redux';
import { change } from '../../../Entities/userSlice'
import { useDispatch } from "react-redux";

export function MainProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://blog.kata.academy/api/user', {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: data.username || user.username,
                        email: data.email || user.email,
                        image: data.image || user.image
                    }
                })
            });
            
            if (response.ok) {
                dispatch(change((await response.json()).user))
            } else {
                const result = await response.json();
            }
    
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className={styles.editProfileContainer}>
            <h2 className={styles.title}>Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label} htmlFor="username">Username</label>
                <input 
                    className={styles.input} 
                    type="text" 
                    id="username" 
                    placeholder="John Doe" 
                    {...register('username', { required: 'Username is required' })} 
                />
                {errors.username && <span className={styles.error}>{errors.username.message}</span>}

                <label className={styles.label} htmlFor="email">Email address</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    {...register('email', {
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address'
                        }
                    })} 
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                <label className={styles.label} htmlFor="password">New password</label>
                <input
                    className={styles.input}
                    type="password"
                    id="password"
                    placeholder="New password"
                    {...register('password')} // Используем register без обязательных правил
                />

                <label className={styles.label} htmlFor="avatar">Avatar image (url)</label>
                <input
                    className={styles.input}
                    type="url"
                    id="avatar"
                    placeholder="Avatar image"
                    {...register('image', {
                        pattern: {
                            message: 'Please enter a valid image URL (png, jpg, jpeg)'
                        }
                    })}
                />
                {errors.avatar && <span className={styles.error}>{errors.avatar.message}</span>}

                <button className={styles.button} type="submit">Save</button>
            </form>
        </div>
    );
}