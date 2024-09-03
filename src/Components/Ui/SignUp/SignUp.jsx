import { Button } from "antd";
import style from './SignUp.module.scss'
import { Link } from "react-router-dom";

export function SignUp() {
    return <Link to='/sign-up'><Button className={style.signup} size='large'>Sign Up</Button></Link>
}