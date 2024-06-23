import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ChooseAvatar from './features/ChooseAvatar/ChooseAvatar';
import Home from './features/Home/Home';
import Single from './features/Remaker/Single';
import Signup from './features/Signup/Signup';
import TermsAndConditions from './features/TermsAndConditions/TermsAndConditions'
import HowToUse from './features/TermsAndConditions/HowToUse'
import Admin from './features/Admin/Dashboard'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ChooseAvatar" element={<ChooseAvatar />} />
        <Route path="/Single" element={<Single />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/HowToUse" element={<HowToUse />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
