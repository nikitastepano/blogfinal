import { Button } from "antd";
import style from './SignIn.module.scss'
import { Link } from "react-router-dom";

export function SignIn() {
    return <Link to='/sign-in'><Button className={style.signin} type="text" size='large'>Sign In</Button></Link>
}