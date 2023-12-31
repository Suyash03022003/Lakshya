import React, { useState } from 'react'
import Logo from '../../assets/Logo3.svg'
import Seperator from '../../assets/Seperator.svg'
import UserName from '../../assets/UserName.svg'
import Password from '../../assets/Password.svg'
import Image from '../../assets/img2.jfif'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchLoginDetails = async (e) => {
    e.preventDefault();

    try {
      axios.post("http://localhost:5000/user/login", formData)
        .then((res) => {
          if (res.data.message === "Login successful!") {
            setCookie('user', res.data.user, { path: '/' });
            navigate(`/${res.data.user.role}`);
          } else {
            alert(res.data.message);
          }
        })
    } catch (e) {
      console.log(e);
    }
    setFormData({
      email: '',
      password: ''
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginNav}>
        <img src={Logo} width="7%" alt="" />
        <p className={styles.head}>Welcome to <span>LAKSHYA</span></p>
        <div></div>
      </div>
      <div className={styles.loginMainDiv}>
        <div className={styles.loginLeftSubDiv}>
          <img src={Image} width="60%" height="auto" alt="" />
        </div>
        <div className={styles.loginRightSubDiv}>
          <form className={styles.right}>
            <p className={styles.loginHead}>LOGIN</p>
            <div className={styles.chooseLanguageDiv}>
              <p>Choose Preffered Language</p>
              <span className={styles.select}></span>
              <select>
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Gujrati</option>
                <option>Bengali</option>
              </select>
            </div>
            <img src={Seperator} alt='Seperator' className={styles.seperator} />
            <div className={styles.inputDiv}>
              <img src={UserName} alt='User' className={styles.inputImage} />
              <input
                type='text'
                name="email"
                className={styles.inputTag}
                placeholder='Enter Email'
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.inputDiv}>
              <img src={Password} alt='Password' className={styles.inputImage} />
              <input
                type='password'
                name="password"
                className={styles.inputTag}
                placeholder='Enter Password'
                onChange={handleInputChange}
                required
              />
            </div>
            <p className={styles.forgotPass}>Forgot Password</p>
            <button onClick={fetchLoginDetails} type='submit'>Submit</button>
          </form>
        </div>
      </div>
      {/* <div className={styles.left}>
        <div className={styles.content}>
        </div>
        <div className={styles.acontent}>
        </div>
      </div>
      <form className={styles.right}>
        <p className={styles.loginHead}>LOGIN</p>
        <div className={styles.chooseLanguageDiv}>
          <p>Choose Preffered Language</p>
          <span className={styles.select}></span>
          <select>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
            <option>Gujrati</option>
            <option>Bengali</option>
          </select>
        </div>
        <img src={Seperator} alt='Seperator' className={styles.seperator} />
        <div className={styles.inputDiv}>
          <img src={UserName} alt='User' className={styles.inputImage} />
          <input
            type='text'
            name="email"
            className={styles.inputTag}
            placeholder='Enter Email'
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputDiv}>
          <img src={Password} alt='Password' className={styles.inputImage} />
          <input
            type='password'
            name="password"
            className={styles.inputTag}
            placeholder='Enter Password'
            onChange={handleInputChange}
            required
          />
        </div>
        <p className={styles.forgotPass}>Forgot Password</p>
        <button onClick={fetchLoginDetails} type='submit'>Submit</button>
      </form> */}
    </div>
  )
}

export default Login