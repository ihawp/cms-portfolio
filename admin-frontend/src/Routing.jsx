import { useContext } from 'react';
import { AuthContext } from './providers/AuthProvider';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './pages/Blog';

// Will build seperate react app for admin interface.
// I will set cookies on the /admin route for logins.
// I will also update clearing cookies to this route.
// (maybe I'll add .env variable for cookie path!).
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';

function Routing() {

    const { auth } = useContext(AuthContext);

    return <>
        {auth ? <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/blog" element={ <Blog /> } />
            <Route path="/portfolio" element={ <Portfolio /> } />
            <Route path="*" element={ <Error /> } />
        </Routes> : <Routes>
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="*" element={ <Error /> } />
        </Routes>}
    </>

}

export default Routing;