import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  function handleSubmit(e: FormEvent) {
    e?.preventDefault();
  }

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
            <input disabled className={styles.passwordInput} type="text" placeholder="Your password will be generated here" />
            <div className={styles.options}>
              <label>
                Character number
                <input className={styles.characterNumberOption} type="number" />
              </label>
              <label className={styles.option}>
                <input type="checkbox"></input>
                Include uppercase letters
              </label>
              <label className={styles.option}>
                <input type="checkbox"></input>
                Include lowercase letters
              </label>
              <label className={styles.option}>
                <input type="checkbox"></input>
                Include numbers
              </label>
            </div>
            <button type="submit">
              Generate
            </button>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export default Home
