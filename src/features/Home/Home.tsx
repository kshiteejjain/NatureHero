import { useNavigate } from 'react-router-dom'
import startIcon from '../../assets/StartButton.png'
import BgVideo from '../../assets/bg-video.mp4'

import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    let natureHero = localStorage.getItem('natureHero');
    let natureHeroObject = natureHero ? JSON.parse(natureHero) : {};
    let newProperty = { 'history': 'strt&' };
    Object.assign(natureHeroObject, newProperty);
    localStorage.setItem('natureHero', JSON.stringify(natureHeroObject));
    navigate('/Signup')
  }
  return (
    <div className='start'>
      <video className='bg-video' autoPlay muted loop>
        <source src={BgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img src={startIcon} className='startIcon' onClick={handleContinue} />
    </div>
  )
}

export default Home;
