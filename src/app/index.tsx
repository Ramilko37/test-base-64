import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import TestPage from "../modules/TestPage";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <TestPage />
    </div>
  )
}

export default Home
