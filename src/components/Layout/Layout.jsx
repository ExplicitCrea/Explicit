import { Outlet, useLocation } from 'react-router-dom'
import StyledLayout from './StyledLayout'
import usePreventZoom from '../../utils/usePreventZoom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
export const Layout = () => {
    const location = useLocation();
    const excludedPages = ['/faq', '/services','/legal-disclaimer','/artbook'];
    const isExcludedPage = excludedPages.includes(location.pathname);
    usePreventZoom();
    return (
        <StyledLayout>
            <Header/>
            <div className='white-border'/>
            <Outlet/>
            {
                !isExcludedPage && <Footer/>
            }
        </StyledLayout>
    )
}
