import StyledLayout from './StyledLayout'

export const Layout = ({children}) => {
    return (
        <StyledLayout>
            <h1>Layout</h1>
            {children}
        </StyledLayout>
    )
}
