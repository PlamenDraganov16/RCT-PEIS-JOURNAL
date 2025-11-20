import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import About from "./components/about/about.jsx"
import Home from "./components/home/Home.jsx"
import Feed from "./components/feed/Feed.jsx"
import Details from "./components/details/Details.jsx"

function App() {

    return (
        <>
            <Header />

            <Routes>
                {/* <Route path="/" element={<Landing />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/feed/:blogId/details" element={<Details />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
