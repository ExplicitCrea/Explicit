import { Outlet, useLocation } from 'react-router-dom'
import StyledLayout from './StyledLayout'
import usePreventZoom from '../../utils/usePreventZoom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
export const Layout = () => {
    const location = useLocation();
    const includedPage = ['/', '/services'];
    const isIncludedPage = includedPage.includes(location.pathname);
    usePreventZoom();
    return (
        <StyledLayout>
            <Header/>
            <div className='white-border'/>
            <Outlet/>
            {
                isIncludedPage && <Footer/>
            }
        </StyledLayout>
    )
}
