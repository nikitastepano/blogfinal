import { Pagination, ConfigProvider } from 'antd';
import { fetchArticles } from '../../../Entities/articleSlice';

import { useDispatch, useSelector } from 'react-redux';


export function Paginations() {
    const dispatch = useDispatch()
    const articlesCount = useSelector((state) => state.article.data.articlesCount)

    const handlePageChange = (page) => {
        const offset = (page - 1) * 5
        dispatch(fetchArticles({ offset, limit: 5 }))
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'white'
                },
                components: {
                    Pagination: {
                        itemActiveBg: '#1890FF',
                        itemBg: 'transparent'
                    },
                },
            }}
        >
            <Pagination align="center" style={{position: 'absolute', marginBottom: '20px', bottom: '0'}} defaultCurrent={1} total={articlesCount} showSizeChanger={false} pageSize={5} onChange={handlePageChange}/>
        </ConfigProvider>
    )
}