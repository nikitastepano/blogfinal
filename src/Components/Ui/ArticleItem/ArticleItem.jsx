import React, { useState } from 'react';
import style from './ArticleItem.module.scss';
import { format } from 'date-fns';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

export function ArticleItem({ article }) {
    const [favorited, setFavorited] = useState(article.favorited);
    const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

    const bodyExcerpt = article.description && article.description.length > 200 ? article.description.slice(0, 179) + '...' : article.description || '';
    const truncatedTitle = article.title.length > 60 ? article.title.slice(0, 27) + '...' : article.title;

    function onFavorite(slug) {
        const tok = localStorage.getItem('tokened');
        fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${tok}` 
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            }
            return response.json();
        })
        .then(data => {
            setFavorited(true);
            setFavoritesCount(prevCount => prevCount + 1);
        })
        .catch(error => {
            console.error('There was a problem with the favorite operation:', error);
        });
    }

    function onNoFavorite(slug) {
        const tok = localStorage.getItem('tokened');
        fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${tok}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            }
            return response.json();
        })
        .then(data => {
            setFavorited(false);
            setFavoritesCount(prevCount => prevCount - 1);
        })
        .catch(error => {
            console.error('There was a problem with the unfavorite operation:', error);
        });
    }

    function toggleFavorite() {
        if (!favorited) {
            onFavorite(article.slug);
        } else {
            onNoFavorite(article.slug);
        }
    }

    return (
        <div className={style.articleitem}>
            <div className={style.articleitem__top}>
                <div className={style.articleitem__left}>
                    <div className={style.articleitem__left__container}>
                        <Link to={`/articles/${article.slug}`}>{truncatedTitle}</Link>
                        <div className={style.divid}>
                            {
                                favorited ? 
                                    <HeartFilled style={{ color: "#FF0707" }} onClick={toggleFavorite} /> :
                                    <HeartOutlined onClick={toggleFavorite} />
                            }
                            {favoritesCount}
                        </div>
                    </div>
                    
                    <ul style={{ padding: 0, display: 'flex', gap: '10px' }}>
                        {article.tagList.slice(0, 4).map((tag, index) => (
                            <li className={style.tag} key={index}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={style.articleitem__right}>
                    <div>
                        <div className={style.articleitem__right__name}>{article.author.username}</div>
                        <div className={style.articleitem__right__date}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</div>
                    </div>
                    <img src={article.author.image} alt="" />
                </div>
            </div>
            <div className={style.articleitem__bottom}>{bodyExcerpt}</div>
        </div>
    );
}
