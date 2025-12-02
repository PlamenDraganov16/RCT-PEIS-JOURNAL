import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import About from "./components/about/about.jsx"
import Home from "./components/home/Home.jsx"
import Feed from "./components/feed/Feed.jsx"
import Details from "./components/details/Details.jsx"
import LandingPage from "./components/landing-page/LandingPage.jsx"
import UserContext from "./contexts/UserContext.jsx"

import { useContext } from "react"

function App() {
    const { user } = useContext(UserContext);

    return (
        <>
            <Header />

            <Routes>
                <Route path="/landing" element={<LandingPage />} />
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
