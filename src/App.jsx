import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router'

import Dashboard from './components/Dashboard'
import Users from './components/Users'
import Addusers from './components/Addusers'
import Questions from './components/Questions'
import Addquestions from './components/Addquestions'

import Login from './components/Login'
import Quiz from './components/Quiz'
import NewQuiz from './components/NewQuiz'
import Quizlanding from './components/Quizlanding'
import Quizinstruction from './components/Quizinstruction'
import MainQuiz from './components/MainQuiz'
import { useState } from 'react'
import PreResult from './components/PreResult'


function App() {
  const [answeredQuestions, setAnsweredQuestions] = useState();
    const [markedForReview, setMarkedForReview] = useState();
    const [visitedQuestions, setVisitedQuestions] = useState();
    const [notAnswered, setNotAnswered] = useState();
    

  const handlesend = (a,b,c,d) =>{
     setAnsweredQuestions(a)
     setMarkedForReview(b)
     setVisitedQuestions(c)
     setNotAnswered(d)
     console.log(answeredQuestions)
     console.log(markedForReview)
     console.log(visitedQuestions)
     console.log(notAnswered)
  }

 
  return (
      <div className = "App">
        <Router>
         
          <Routes>
            <Route path ="/dashboard" element={<Dashboard />} />
            <Route path ="/users" element={<Users/>} />
            <Route path ="/users/new" element={<Addusers/>} />
            <Route path ="/questions" element={<Questions/>} />
            <Route path ="/question/new" element={<Addquestions/>} />
            <Route path ="/quiz" element={<Quiz/>} />
            <Route path ="/quiz/new" element={<NewQuiz/>} />
            <Route path ="/" element={<Login/>} />
             <Route path ="/quizlanding" element={<Quizlanding/>} />
             <Route path ="/quizinstruction" element={<Quizinstruction/>} />
             <Route path ="/mainquiz" element={<MainQuiz handlesend={handlesend}/>} />
             <Route path ="/preresult" element={<PreResult answeredQuestions={answeredQuestions} notAnswered={notAnswered} markedForReview={markedForReview} visitedQuestions={visitedQuestions}/>} />
          </Routes>
        </Router>
      </div>
     
  )
}

export default App
