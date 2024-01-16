import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import StyledLayout from './StyledLayout'
import usePreventZoom from '../../utils/usePreventZoom';

export const Layout = () => {
    usePreventZoom();
    return (
        <StyledLayout>
            <Header/>
            <Outlet/>
        </StyledLayout>
    )
}
