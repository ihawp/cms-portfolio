import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

import Header from './components/Header';
import Footer from './components/Footer';

import PortfolioProvider from './providers/PortfolioProvider';
import BlogProvider from './providers/BlogProvider';

function App() {
  return <BrowserRouter>
  <PortfolioProvider>
  <BlogProvider>

    <Header />
    <main>
      <Routing />
    </main>
    <Footer />
    
  </BlogProvider>
  </PortfolioProvider>
  </BrowserRouter>
}

export default App;