import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.webp'

import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const handleLogo = () =>{
    localStorage.clear()
    navigate('/');
  }
  return (
      <div className='header'>
        <div className="logo-title" onClick={handleLogo}> <img src={logo} /> <h2>Pictures With Wild</h2> </div>
        <ul className='menu'>
          <li onClick={() => navigate('/TermsAndConditions')}><a href='javascript:void(0)'>Terms and conditions</a></li>
          <li onClick={() => navigate('/HowToUse')}><a href='javascript:void(0)'>How to use</a></li>
        </ul>
      </div>
  )
};
export default Header;
