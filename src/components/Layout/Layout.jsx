import { Outlet } from 'react-router-dom'
import StyledLayout from './StyledLayout'
import usePreventZoom from '../../utils/usePreventZoom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
export const Layout = () => {
    usePreventZoom();
    return (
        <StyledLayout>
            <Header/>
            <div className='white-border'/>
            <Outlet/>
            <Footer/>
        </StyledLayout>
    )
}
