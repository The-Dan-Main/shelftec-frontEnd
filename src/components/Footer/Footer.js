import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer(props) {

    return (
        <div className="Footer-container">
            <div className="footer-logo-container">
                <Link to="/">
                    <img src={require('../../img/logo2.png')} alt="" className='footer-logo' title='' />
                </Link>
            </div>
            <div className="links-container">
                <a href="https://github.com/The-Dan-Main/therebegames" target="blank">
                    <img src={require('../../img/github-logo.png')} alt="this GitHub repository" className='footer-links-img' title='GitHub repository' />
                </a>
                <a href="https://www.linkedin.com/in/dan-weber-zurich/" target="blank">
                    <img src={require('../../img/LI-In-Bug.png')} alt="my Linked-In profile" className='footer-links-img' title='Linked-In profile' id='linked-in' />
                </a>
            </div>
        </div>
    )
}