import logo from '../../assets/logo.webp'
import './Loader.css'

const Loader = () => {
  return (
    <div className='loading'>
        <img src={logo} className='logo' />
      <span className="loader"></span>
    </div>
  )
}
export default Loader;