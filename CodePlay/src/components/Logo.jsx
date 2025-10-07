import logo from '../assets/logo.png';
import styles from './logo.module.css';
function Logo() {
    return (
        <div className="logo">
            
            <img src={logo} alt="Logo" className={styles.img} />
        </div>
    )
}
export default Logo;