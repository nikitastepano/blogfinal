import style from './App.module.scss'
import { Main } from '../Layout/Main/Main'
import { MainArticles } from '../Layout/Main/MainArticles'
import { MainSignIn } from '../Layout/Main/MainSignIn'
import { MainSignUp } from '../Layout/Main/MainSignUp'
import { MainProfile } from '../Layout/Main/MainProfile'
import { MainCreate } from '../Layout/Main/MainCreate'
import { Layout } from '../Layout/Layout'
import { EditArticleForm } from '../Layout/Main/MainEdit'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ArticleList } from '../Ui/ArticleList/ArticleList'

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Main />
        },
        {
          path: "/articles",
          children: [
              {
                  index: true,
                  element: <ArticleList />,
              },
              {
                  path: "/articles/:slug",
                  element: <MainArticles />,
              },
              {
                  path: "/articles/:slug/edit",
                  element: <EditArticleForm />,
              },
          ],
      },
        {
          path: "/sign-in",
          element: <MainSignIn />
        },
        {
          path: "/sign-up",
          element: <MainSignUp />
        },
        {
          path: "/profile",
          element: <MainProfile />
        },
        {
          path: "/new-article",
          element: <MainCreate />
        },
      ]
    },
  ],);

  return (
    <div className={style.blogfinal}>
      <RouterProvider router={router} />
    </div>
  )
}