import Footer from "../components/footer";
import Header from "../components/navbar";


export default function Container({children}) {
    return (
       <>
        <Header/>
        {children}
        <Footer/>
        </>
    )
}