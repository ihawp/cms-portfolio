import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';

const App = () => {
  return <BrowserRouter>

    <Header />

    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/blog" element={ <Blog /> } />
      <Route path="/portfolio" element={ <Portfolio /> } />
    </Routes>

    <Footer />

  </BrowserRouter>
}

export default App;