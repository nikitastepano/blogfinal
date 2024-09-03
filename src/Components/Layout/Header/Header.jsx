import style from './Header.module.scss'
import { RealworldBlog } from '../../Ui/RealworldBlog/RealworldBlog'
import { SignIn } from '../../Ui/SignIn/SignIn'
import { SignUp } from '../../Ui/SignUp/SignUp'
import { CreateArticle } from '../../Ui/CreateArticle/CreateArticle'
import { LogOut } from '../../Ui/LogOut/LogOut'
import { Profile } from '../../Ui/Profile/Profile'
import { useSelector } from 'react-redux';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { change } from '../../../Entities/userSlice'

export function Header() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const isAuthenticated = user && Object.keys(user).length > 0;
    const tokened = localStorage.getItem('tokened')

    useEffect(() => {
        async function getUser() {
            const response = await fetch('https://blog.kata.academy/api/user', {headers: {Authorization: `Token ${tokened}`}})
            if (response.ok) {
                const data = await response.json()
                dispatch(change(data.user));
            }
        }
        getUser()
    }, [])

    return (
        <div className={style.header}>
            <RealworldBlog />
            <div className={style.header__buttons}>
                {isAuthenticated ? <><CreateArticle /><Profile /><LogOut /></> : <><SignIn /><SignUp /></>}
            </div>
        </div>
    )
}