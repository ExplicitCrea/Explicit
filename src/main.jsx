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
import { Olympics } from './pages/Olympics/Olympics.jsx';
import { Jd } from './pages/Jd/Jd.jsx';
import { Oreal } from './pages/Oreal/Oreal.jsx';
import {History} from './pages/History/History.jsx'
import { Contact } from './pages/Contact/Contact.jsx';
import { Faq } from './pages/FAQ/Faq.jsx';
import { LegalDisclaimer } from './pages/Legal Disclaimer/LegalDisclaimer.jsx';
import { Bruce_Grannec_Page } from './pages/Bruce_Grannec_Page/Bruce_Grannec_Page.jsx';
import { Vzion } from './pages/Vzion/Vzion.jsx';
import { Pg } from './pages/Pg/Pg.jsx';
import { TheGuill } from './pages/TheGuill/TheGuill.jsx';
import { MahdibaPage } from './pages/Mahdiba/MahdibaPage.jsx';
import { Wrldmag } from './pages/Wrldmag/Wrldmag.jsx'
import { Eden } from './pages/Eden LZ/Eden.jsx';



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
        path: '/brucegrannec',
        element: <Bruce_Grannec_Page/>
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
        path: '/olympics',
        element: <Olympics/>,
      },
      {
        path: '/le-grand-jd',
        element: <Jd/>,
      },
      {
        path: '/loreal',
        element: <Oreal/>,
      },
      {
        path: '/history',
        element: <History/>,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
      {
        path: '/faq',
        element: <Faq/>,
      },
      {
        path: '/legal-disclaimer',
        element: <LegalDisclaimer/>,
      },
      {
        path: '/vzion',
        element: <Vzion/>
      },
      {
        path: '/pg',
        element: <Pg/>,
      },
      {
        path: '/theguill',
        element: <TheGuill/>,
      }, 
      {
        path: '/mahdiba',
        element: <MahdibaPage/>
      },
      {
        path: '/wrldmag',
        element: <Wrldmag/>
      },
      {
        path: '/eden-lz',
        element: <Eden/>,
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
