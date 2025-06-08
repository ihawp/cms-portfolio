import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import AuthProvider from './providers/AuthProvider';
import PortfolioProvider from './providers/PortfolioProvider';

import Routing from './Routing';

function App() {
  return <BrowserRouter basename='/admin/ihawp'>
    <AuthProvider>
    <PortfolioProvider>

      <Header />
      
      <Routing />

      <Footer />
      
    </PortfolioProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App;