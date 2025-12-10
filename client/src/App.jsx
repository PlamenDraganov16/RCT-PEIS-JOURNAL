import { Route, Routes } from "react-router"
import Footer from "./components/footer/Footer.jsx"
import Header from "./components/header/Header.jsx"
import About from "./components/about/about.jsx"
import Home from "./components/home/Home.jsx"
import Feed from "./components/feed/Feed.jsx"
import Details from "./components/details/Details.jsx"
import LandingPage from "./components/landing-page/LandingPage.jsx"
import Register from "./components/register/Register.jsx"
import Logout from "./components/logout/Logout.jsx"
import Login from "./components/login/Login.jsx"
import Edit from "./components/edit/Edit.jsx"
import Create from "./components/create/Create.jsx"
import Profile from "./components/profile/Profile.jsx"

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/welcome" element={<LandingPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/add-blog" element={<Create />} />
                <Route path="/feed/:blogId/details" element={<Details />} />
                <Route path="/feed/:blogId/edit" element={<Edit />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

            <Footer />
        </>
    )
}

export default App
