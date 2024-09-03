import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import s from './MainCreate.module.scss';
import { useParams } from 'react-router-dom'
import { Spin, Alert } from "antd";
import { getArticle } from '../../../Entities/fetchArticle'

export function EditArticleForm() {
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const { slug } = useParams()
    const [data, setData] = useState(null)
    const { register, handleSubmit, setValue, reset } = useForm();

    useEffect(() => {
        getArticle(slug)
            .then(({article}) => setData(article))
      }, [])

      useEffect(() => {
        if (data) {
            reset({
                title: data.title,
                description: data.description,
                body: data.body,
            });
            setTags(data.tagList);
        }
    }, [data]);
  
    const onSubmit = data => {
        const tok = localStorage.getItem('tokened');
        fetch(`https://blog.kata.academy/api/articles/${slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${tok}`
          },
          body: JSON.stringify({ article: data }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not okay');
          }
          navigate('/');
        })
        .catch(error => {
          console.error('There was a problem with the create operation:', error);
        });
    };
  
    const addTag = () => {
      if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        setTagInput('');
        setValue('tagList', newTags);
      }
    };
  
    const deleteTag = index => {
      const newTags = tags.filter((_, i) => i !== index);
      setTags(newTags);
      setValue('tagList', newTags);
    };

    if (!data) {
        return <div style={{display: 'flex', marginTop: '20px', justifyContent: 'center', gap: '20px'}}><Spin size='large'/><Alert type="info" message="Загрузка статьи..." /></div>
      }
  
    return (
      <div className={s.container}>
        <h2>Edit article</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s['form-group']}>
            <label className={s.label}>Title</label>
            <input className={s.input} {...register('title', { required: true })} />
          </div>
          <div className={s['form-group']}>
            <label className={s.label}>Short description</label>
            <input className={s.input} {...register('description', { required: true })} />
          </div>
          <div className={s['form-group']}>
            <label className={s.label}>Text</label>
            <textarea className={s.textarea} {...register('body', { required: true })}></textarea>
          </div>
          <div className={s['form-group']}>
            <label className={s.label}>Tags</label>
            <div className={s.tags}>
              {tags.map((tag, index) => (
                <div key={index} className={s.tag}>
                  <input className={s['input-tag']} value={tag} readOnly />
                  <button type="button" className={s['delete-tag']} onClick={() => deleteTag(index)}>
                    Delete
                  </button>
                </div>
              ))}
              <input
                className={s['input-tag']}
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
              />
              <button type="button" className={`${s.button} ${s['button-secondary']}`} onClick={addTag}>
                Add tag
              </button>
              <input type="hidden" value={tags} {...register('tagList')} />
            </div>
          </div>
          <button type="submit" className={s.button}>Send</button>
        </form>
      </div>
    );
  };