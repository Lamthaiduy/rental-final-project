import Footer from "../components/footer";
import Header from "../components/navbar";
import { useLocation } from "react-router-dom";


export default function Container({children}) {
    const {pathname} = useLocation()
    return (
       <>
        <Header/>
        {children}
        {pathname !== '/message' && <Footer />}
        </>
    )
}