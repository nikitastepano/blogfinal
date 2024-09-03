import { Button } from "antd";
import style from './LogOut.module.scss'
import { useDispatch } from "react-redux";
import { logout } from '../../../Entities/userSlice'
import { Link } from "react-router-dom";

export function LogOut() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('tokened')
    };

    return <Link to='/'><Button className={style.logout} size='small' onClick={handleLogout}>Log Out</Button></Link>
}