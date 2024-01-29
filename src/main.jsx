import ReactDOM from 'react-dom/client'
import 'sanitize.css';
import './main.css';
import './utils/i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home.jsx'
import { Layout } from './components/Layout/Layout.jsx';
import { Services } from './pages/Services/Services.jsx';
<<<<<<< HEAD
import { ArtbookPage } from './pages/ArtbookPage/ArtbookPage.jsx';
=======
>>>>>>> f29e625b7c1f489cf170d36722b6594f2405134e
import { Potatoz } from './pages/Potatoz/Potatoz.jsx';

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
        path: '/artbook',
        element: <ArtbookPage />,
      },

      {
        path: '/services',
        element: <Services/>,
      },
      {
        path: '/potatoz',
        element: <Potatoz/>,
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
