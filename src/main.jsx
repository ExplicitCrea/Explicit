import ReactDOM from 'react-dom/client'
import 'sanitize.css';
import './main.css';
import './utils/i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home.jsx'
import { Layout } from './components/Layout/Layout.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export const Main = () => {
  return (
    <RouterProvider router={router} />
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(<Main/>)
