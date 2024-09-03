import style from './ArticleList.module.scss'
import { Spin, Alert } from "antd";
import { ArticleItem } from '../ArticleItem/ArticleItem'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticles } from '../../../Entities/articleSlice';

export function ArticleList() {
    const articles = useSelector(state => state.article.data.articles)
    const status = useSelector(state => state.article.status)

    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchArticles({ offset: 0, limit: 5 }))
    }, [dispatch])

    return (
        <ul className={style.articlelist}>
            {status === 'loading' ? <div className={style.loading}><Spin size='large'/><Alert type="info" message="Загрузка статей..." /></div> : articles?.map((article, index) => <ArticleItem article={article} key={index} />)}
        </ul>
    )
}