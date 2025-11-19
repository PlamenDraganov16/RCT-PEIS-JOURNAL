import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import About from "./components/about/about.jsx"
import Home from "./components/home/Home.jsx"

function App() {

    return (
        <>
            <Header />

            <Routes>
                {/* <Route path="/" element={<Landing />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
