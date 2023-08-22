import SignInButton from '../../button';
import styles from './page.module.css';
import googleIcon from '../../../../../public/assets/googleIcon.png';
export default function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.imputContainer}>
          <input className={styles.imputEmail} type="text" />
          <input className={styles.imputName} type="password" />
          <div>
            <button>login local</button>
          </div>
        </div>
        <div>
          <SignInButton
            provider="google"
            image={googleIcon}
            textButtonSigned="logado"
            textButtonNotSigned="nao logado"
          />
        </div>
      </div>
    </>
  );
}
