import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';

import Header from '../components/Header';
import Footer from '../components/Footer';

import AuthProvider from '../providers/AuthProvider';
import PortfolioForm from '../components/PortfolioForm';

function App() {
  const [form, setForm] = useState({
    title: '',
    intro: '',
    role: '',
    timeline: '',
    toolsUsed: '',
    skillsApplied: '',
    keyTasks: '',
    challenges: '',
    takeaways: '',
    solutionSummary: '',
    githubURL: '',
    projectSite: '',
    files: [] // Files stored inside form object
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, files: e.target.files }));
  };

  const doThing = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    // Append all non-file fields
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'files') return;
      formData.append(key, value);
    });

    // Append files from form.files
    for (let i = 0; i < form.files.length; i++) {
      formData.append('files', form.files[i]);
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/portfolio/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <BrowserRouter>
    <AuthProvider>

      <Header />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="*" element={ <Error /> } />
      </Routes>

      <Footer />

    </AuthProvider>
  </BrowserRouter>
}

export default App;