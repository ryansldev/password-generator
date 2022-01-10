import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { FiMoon, FiSun } from 'react-icons/fi';
import PasswordToClipboard from './components/PasswordToClipboard';
import PasswordStrengthMeter from './components/PasswordStrengthMeter';

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [numCharacters, setNumCharacters] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [password, setPassword] = useState('');
  
  function handleSubmit(e: FormEvent) {
    e?.preventDefault();
    const characters: any = [];
    let numbersPosition;
    let alphabetLowercasePosition;
    let alphabetUppercasePosition;
    let symbolsPosition;

    if(!includeLowercase && !includeUppercase && !includeSymbols && !includeNumbers) {
      alert('You need to put something option to generate a password');
      return;
    }

    if(includeLowercase || includeUppercase) {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if(includeUppercase) {
        characters.push(alphabet);
        alphabetUppercasePosition = characters.length - 1;
      }
  
      if(includeLowercase) {
        characters.push(alphabet.toLowerCase());
        alphabetLowercasePosition = characters.length - 1;
      }
    }

    if(includeNumbers) {
      characters.push('0123456789');
      numbersPosition = characters.length - 1;
    }

    if(includeSymbols) {
      characters.push('@#$%.,`[{}]()*&¨!?"+-');
      symbolsPosition = characters.length - 1;
    }

    let password = '';
    for (let index = 0; index < numCharacters; index++) {
      let characterSectionPosition = 0;
      let a = password.includes('0123456789');
      if(includeNumbers && !password.includes('0123456789') && numbersPosition) {
        characterSectionPosition = numbersPosition;
      }

      if(includeLowercase && !password.includes('abcdefghijklmnopqrstuvwxyz') && alphabetLowercasePosition) {
        characterSectionPosition = alphabetLowercasePosition;
      }

      if(includeUppercase && !password.includes('ABCDEFGHIJKLMNOPQRSTUVWXYZ') && alphabetUppercasePosition) {
        characterSectionPosition = alphabetUppercasePosition;
      }

      if(includeSymbols && !password.includes('@#$%.,`[{}]()*&¨!?"+-') && symbolsPosition) {
        characterSectionPosition = symbolsPosition;
      }

      const characterSection = characters[Math.floor(Math.random() * characters.length )];
      password += characterSection[Math.floor(Math.random() * characterSection.length)];
    }

    const passwordInput = document.querySelector('#passwordInput');
    passwordInput?.removeAttribute('disabled');

    setPassword(password);
  }
  
  useEffect(() => {
    const html = document.querySelector('html');
    if(darkMode) {
      html?.classList.add('dark-mode');
      return;
    }

    html?.classList.remove('dark-mode');
  }, [darkMode]);

  return (
    <div>
      <Head>
        <title>Password Generator</title>
        <meta name="description" content="a beautiful and simple password generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              disabled
              className={styles.passwordInput}
              type="text"
              placeholder="Your password will be generated here"
              value={password}
              id="passwordInput"
            />
            <PasswordToClipboard password={password} />
            <PasswordStrengthMeter password={password} />
            <div className={styles.options}>
              <label>
                Character number
                <input
                  className={styles.characterNumberOption}
                  type="number"
                  value={numCharacters}
                  onChange={(e: any) => setNumCharacters(e.target.value)}
                />
              </label>
              <label className={styles.option}>
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                Include uppercase letters
              </label>
              <label className={styles.option}>
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                Include lowercase letters
              </label>
              <label className={styles.option}>
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                Include numbers
              </label>
              <label className={styles.option}>
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>
            <button type="submit">
              Generate
            </button>
          </form>
          <button className={styles.viewMode} onClick={() => setDarkMode(!darkMode ? true : false)}>
            { !darkMode ? <FiMoon size={24} /> : <FiSun size={24} /> }
            { !darkMode ? 'Dark Mode' : 'Light mode' }
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
