import Footer from '../Footer/footer';
import MenuBar from '../MenuBar/menubar';
import { Outlet} from 'react-router-dom';

const Layout=()=>{
    return (
        <>
            <MenuBar />
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;