import React from 'react'
import styles from '../CSS/Quizlanding.module.css'
import { useNavigate } from 'react-router'

const Quizlanding = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.landing}>
        <div className={styles.main}>
          <h1>Welcome to the Quiz</h1>
          <span className ={styles.mainspan}>Test your knowledge with our engaging quiz</span>
          <button className={styles.button} onClick={()=>{navigate("/quizinstruction")}}>Start Quiz</button>
        </div>
        <div className={styles.subhead}>
            <div className={styles.three}>
                <h3>How Our Quiz Works</h3>
                <span>Our quiz is designed to challenge your knowledge and provide an interactive learning experience.You'll encounter a variety of questions across different categories</span>
            </div>
             <div className={styles.three}>
                <h3>Why Take Our Quiz</h3>
                <span>Taking our quiz helps you access your knowledge,learn new facts,and have fun while doing it. It's a great way to test yourself and discover new insights</span>
            </div>
             <div className={styles.three}>
                <h3>Get Started Now</h3>
                <span>Click the "Start Quiz" button above to begin your journey.Challenge yourself, enjoy the quiz, and see how much you know!</span>
            </div>
        </div>
      
    </div>
  )
}

export default Quizlanding
