import ReactDOM from 'react-dom/client'
import 'sanitize.css';
import './main.css';
import './utils/i18n';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home/Home.jsx'
import { Layout } from './components/Layout/Layout.jsx';
import { Services } from './pages/Services/Services.jsx';
import { ArtbookPage } from './pages/ArtbookPage/ArtbookPage.jsx';
import { Potatoz } from './pages/Potatoz/Potatoz.jsx';
import { Gg } from './pages/Gg/Gg.jsx';
import { Paltay } from './pages/Paltay/Paltay';
import { Vzion } from './pages/Vzion/vzion.jsx';

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
      },
      {
        path: '/gg',
        element: <Gg/>,
      },
      {
        path: '/paltay',
        element: <Paltay/>,
      },
      {
        path: '/vzion',
        element: <Vzion/>
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
