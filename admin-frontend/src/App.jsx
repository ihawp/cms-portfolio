import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import AuthProvider from './providers/AuthProvider';

// I figure that wrapping the whole app in the providers is okay
// since we dynamically update the data on the frontend after things 
// are submitted, meaning that we already have the most current state,
// even if we navigate to blog and then back to portfolio...because with
// the provider as part of the route element (the alternative) the provider unmounts with the
// page component, meaning that returning to portfolio means a new data fetch.
// You could consider this more ideal if I was using this platform with others, but
// unless 'others' find their way into my app on purpose or accidentally, that just
// will not be the case...and I will be the sole user.
import PortfolioProvider from './providers/PortfolioProvider';
import BlogProvider from './providers/BlogProvider';

import Routing from './Routing';

function App() {
  return <BrowserRouter basename='/admin/ihawp'>
    <AuthProvider>
    <PortfolioProvider>
    <BlogProvider>
      <Header />
      <Routing />
      <Footer />
    </BlogProvider>
    </PortfolioProvider>
    </AuthProvider>
  </BrowserRouter>
}

export default App;