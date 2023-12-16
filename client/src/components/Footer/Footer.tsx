import './Footer.css'
import linkedin_icon from "../../assets/linkedin.svg";

const Footer = () => {
  return (
    <footer>
      <p>Contact me via:</p>
      <a href="mailto:davit.khachaturov.1@iliauni.edu.ge?subject=Request from FM-analyzer">davit.khachaturov.1@iliauni.edu.ge</a>
      <a href="https://www.linkedin.com/in/david-khachaturov-60b059189/" target='_blank'>
        <img src={linkedin_icon} alt="linkedin icon" />
      </a>
    </footer>
  )
}

export default Footer;