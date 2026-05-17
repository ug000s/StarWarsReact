import './App.css'
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import {useState} from "react";
import {navItems} from "./utils/constants.js";
import {StarWarsContext} from "./utils/context.js";

function App() {
    const [page, setPage] = useState(navItems[0]);

    return (
        <StarWarsContext value={setPage}>
            <div className={'container-fluid'}>
                <Header/>
                <Main page={page}/>
                <Footer/>
            </div>
        </StarWarsContext>
    )
}

export default App
