import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import Landing from "./components/Landing-Page/Landing.jsx"
import About from "./components/about/about.jsx"

function App() {

    return (
        <>
            <Header />

            <Routes>
                {/* <Route path="/" element={<Landing />} /> */}
                <Route path="/about" element={<About />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
