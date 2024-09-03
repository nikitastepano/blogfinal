import { ArticleList } from '../../Ui/ArticleList/ArticleList'
import { Paginations } from '../../Ui/Paginations/Paginations'

import { useSelector } from 'react-redux'

export function Main() {
    const articles = useSelector(state => state.article.data.articles)
    const check = articles || []

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ArticleList />
            {check.length > 0 && <Paginations />}
        </div>
    )
}