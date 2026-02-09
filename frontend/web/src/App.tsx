import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//router
import LandingWeb from './pages/LandingWeb';
import AuthPage from './pages/AuthPage';
import About from './pages/About';
import Forum from './pages/Forum';
import Chatbot from './pages/Chatbot';

//header
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingWeb />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
