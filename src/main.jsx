import ReactDOM from 'react-dom/client'
import 'sanitize.css';
import './main.css';
import './utils/i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home.jsx'
import { Layout } from './components/Layout/Layout.jsx';
import { Services } from './pages/Services/Services.jsx';
import { Bruce_Grannec_Page } from './pages/ServicePage/Bruce_Grannec_Page/Bruce_Grannec_Page.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/services',
        element: <Services/>,
      }, 
      {
        path: '/brucegrannec',
        element: <Bruce_Grannec_Page/>
      }
    ],
  },
]);

export const Main = () => {
  return (
    <RouterProvider router={router} />
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(<Main/>)
