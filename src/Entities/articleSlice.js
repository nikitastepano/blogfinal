import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk(
    'article/fetchArticles',
    async ({ offset = 0, limit = 5 }, thunkAPI) => {
        const token = localStorage.getItem('tokened')
        const response = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}&limit=${limit}`, {headers: {'Authorization': `Token ${token}`}})
        const data = await response.json()
        return data
    }
)

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchArticles.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchArticles.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload;
        })
        .addCase(fetchArticles.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
        })
  }
})

export default articleSlice.reducer