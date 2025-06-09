import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

import Header from './components/Header';
import Footer from './components/Footer';

import PortfolioProvider from './providers/PortfolioProvider';

function App() {
  return <BrowserRouter>
  <PortfolioProvider>

    <Header />
    <main>
      <Routing />
    </main>
    <Footer />

  </PortfolioProvider>
  </BrowserRouter>
}

export default App;