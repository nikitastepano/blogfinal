import s from './MainCreate.module.scss';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function MainCreate() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const onSubmit = data => {
    const tok = localStorage.getItem('tokened');
    fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
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

  return (
    <div className={s.container}>
      <h2>Create new article</h2>
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