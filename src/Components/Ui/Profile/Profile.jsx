import style from './Profile.module.scss'
import { useSelector } from 'react-redux';
import icon from '../../../assets/icons.svg'
import { Link } from 'react-router-dom'

export function Profile() {
    const usered = useSelector((state) => state.user.user)
    return (
        <div className={style.profile}>
            <Link to='/profile'>{usered.username || usersavejson.user.username}</Link>
            <Link to='/profile'><img src={usered.image || icon} alt="" /></Link>
        </div>
    )
}