import { Button, ConfigProvider } from 'antd';
import { Link } from "react-router-dom";

export function RealworldBlog() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorLink: 'black',
                    fontSize: '18px'
                }
            }}
        >
            <Link to='/'><Button type="link" style={{textDecoration: 'none'}}>Realworld Blog</Button></Link>
        </ConfigProvider>
    )
}