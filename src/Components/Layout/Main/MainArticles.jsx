import style from './MainArticles.module.scss'
import { getArticle } from '../../../Entities/fetchArticle'
import { Spin, Alert, Button, Modal, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { HeartOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

export function MainArticles() {
    const navigate = useNavigate();
    const { confirm } = Modal;
    const { slug } = useParams()
    const [data, setData] = useState(null)
    const username = useSelector(state => state.user.user?.username)

    const showDeleteConfirm = () => {
        confirm({
          title: 'Are you sure to delete this article?',
          icon: <ExclamationCircleFilled />,
          content: '',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            const tok = localStorage.getItem('tokened');
            fetch(`https://blog.kata.academy/api/articles/${slug}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${tok}`
                },
              })
              navigate('/');
          },
          onCancel() {
            console.log('non');
          },
        });
      };

    useEffect(() => {
        getArticle(slug)
            .then(({article}) => setData(article))
      }, [])

      if (!data) {
        return <div style={{display: 'flex', marginTop: '20px', justifyContent: 'center', gap: '20px'}}><Spin size='large'/><Alert type="info" message="Загрузка статьи..." /></div>
      }

    return (
        <div className={style.post}>
            <div className={style.post__content}>
                <div className={style.post__top}>
                    <div className={style.post__left}>
                        <div className={style.post__left__container}>
                            <a>{data.title}</a>
                            <div><HeartOutlined /> {data.favoritesCount}</div>
                        </div>
                        <ul style={{ paddingLeft: 0, paddingTop: '10px', display: 'flex', gap: '10px', margin: 0 }}>
                            {data.tagList.slice(0, 4).map((tag, index) => (
                                <li className={style.tag} key={index}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={style.post__right}>
                        <div>
                            <div className={style.post__right__name}>{data.author.username}</div>
                            <div className={style.post__right__date}>{format(new Date(data.createdAt), 'MMMM d, yyyy')}</div>
                        </div>
                        <img src={data.author.image} alt="" />
                    </div>
                </div>
                <div className={style.post__discript}>{data.description}{data.author.username === username && <div>
                        <Space wrap><Button className={style.delete} onClick={showDeleteConfirm}>Delete</Button></Space>
                        <Link to={`/articles/${data?.slug}/edit`}><Button className={style.edit}>Edit</Button></Link></div>}
                </div>
                <div className={style.post__body}><Markdown remarkPlugins={[remarkGfm]}>{data?.body}</Markdown></div>
            </div>
        </div>
    )
}