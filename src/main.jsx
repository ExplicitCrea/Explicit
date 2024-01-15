import ReactDOM from 'react-dom/client'
import { Layout } from './components/Layout/Layout.jsx'
import 'sanitize.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);

export const Main = () => {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(<Main/>)
