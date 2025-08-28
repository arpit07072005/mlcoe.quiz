import React, { useState } from 'react'
import styles from '../CSS/Quizinstruction.module.css'
import { useNavigate } from 'react-router'

const Quizinstruction = () => {
    const[button,setButton]=useState(false)
    const navigate = useNavigate();
    
  return (
    <div className={styles.instruct}>
      <h1>Quiz Instructions</h1>
      <div className={styles.tnc}>
        <h4>Terms and Conditions</h4>
        <span>By participating in this quiz, you agree to our terms and conditions. Please read them carefully before proceeding.</span>
      </div>
      <div className={styles.rules}>
        <h4>Rules of the Quiz</h4>
        <ul>
            <li>You have a limited time to answer each questions</li>
            <li>Each correct answer will earn you points. The more points you score, the better your result</li>
            <li>You cannot go back to previous questions once you have answered them.</li>
            <li>Answer all questions within given time limit to maximize your score</li>
            <li>The quiz may contain question from various categories. Be prepared for a diverse range of topics.</li>
        </ul>
        <div className={styles.in}>
        <input type="checkbox" className={styles.input} onClick={()=>{setButton(!button)}}/>
        <label for ="input">I agree to the terms and conditions</label>
        </div>
      </div>
      <button className ={!button ?styles.buttondisable:styles.button} disabled={!button} onClick={()=>{navigate("/mainquiz")}}>Start Quiz</button>
    </div>
  )
}

export default Quizinstruction
