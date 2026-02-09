import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//router
import LandingWeb from './pages/LandingWeb';
import AuthPage from './pages/AuthPage';
import About from './pages/About';
import Forum from './pages/Forum';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';

//header
import Header from './components/Header';


function App() {
  // Detect if user is on mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingWeb />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<Forum isMobile={isMobile} />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
