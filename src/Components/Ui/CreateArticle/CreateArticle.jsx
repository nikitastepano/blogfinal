import style from './CreateArticle.module.scss'
import { Button } from "antd";
import { Link } from 'react-router-dom';

export function CreateArticle() {
    return <Link to='/new-article'><Button className={style.createarticle} size='small'>Create article</Button></Link>
}