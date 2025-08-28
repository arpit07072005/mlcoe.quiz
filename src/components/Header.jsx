import React, { useState } from 'react'
import {BrainCircuit, ChevronRight, CircuitBoard, LayoutDashboard, ShoppingBag, User, WalletCards } from "lucide-react"
import { useNavigate } from 'react-router'
import "../CSS/Header.css"


function Header({id}) {
  const navigate = useNavigate();
  const[user,setUser]=useState(false);
  const[question,setquestion]=useState(false)
  const[quiz,setquiz]=useState(false)
  


   const handleSelectChange = (e) => {
    if (e.target.className === "optionsusers") {
      navigate("/users");
    }
    if (e.target.className === "optionsaddusers") {
      navigate("/users/new");
    }
  };
  const handleSelectChange1 = (e) => {
    if (e.target.className === "optionsquestions") {
      navigate("/questions");
    }
    if (e.target.className === "optionsaddquestions") {
      navigate("/question/new");
    }
  };
   const handleSelectChange2 = (e) => {
    if (e.target.className === "optionsquiz") {
      navigate("/quiz");
    }
    if (e.target.className === "optionsaddquiz") {
      navigate("/quiz/new");
    }
  };
  return (
    <div className ={id==="responsive"?"header1": "header"}>
      <div className="head">
          <BrainCircuit size="15px"/>
          <div className="mlcoename">
            <span className="mlcoe">Mlcoe</span>
            <span className="society">society</span>

          </div>
      </div>
      <div className="headitems">
        <span className = "overview">Overview</span>
        <div className="dashboardhead" onClick={()=>{navigate("/")}}>
            <LayoutDashboard size="15px" color="#020817"/>
            <span>Dashboard</span>
        </div>
        <div className="dashboardhead">
            <User size="15px" color="#020817"/>
        <div className = "user" >
          <div className="dropdownusers" onClick={()=>{setUser(!user)}}>
           <span className = "userdivhead" >Users</span>
           <ChevronRight size ="15px" />
           </div>
           {user && (
            <>
            <span className = "optionsusers" onClick={handleSelectChange}>Users</span>
            <span className = "optionsaddusers" onClick={handleSelectChange}>Add Users</span>
            </>
           )}
        </div>
        </div>
         <div className="dashboardhead">
            <ShoppingBag size="15px" color="#020817"/>
         <div className = "user" >
          <div className="dropdownusers" onClick={()=>{setquestion(!question)}}>
           <span className = "userdivhead" >Questions</span>
           <ChevronRight size ="15px" />
           </div>
           {question&& (
            <>
            <span className = "optionsquestions" onClick={handleSelectChange1}>Questions</span>
            <span className = "optionsaddquestions" onClick={handleSelectChange1}>Add Questions</span>
            </>
           )}
        </div>
        </div>
         <div className="dashboardhead">
            <WalletCards size="15px" color="#020817"/>
        <div className = "user" >
          <div className="dropdownusers" onClick={()=>{setquiz(!quiz)}}>
           <span className = "userdivhead" >Quiz</span>
           <ChevronRight size ="15px" />
           </div>
           {quiz&& (
            <>
            <span className = "optionsquiz" onClick={handleSelectChange2}>Quiz</span>
            <span className = "optionsaddquiz" onClick={handleSelectChange2} >Add Quiz</span>
            </>
           )}
        </div>
        </div>
        <div className="dashboardhead">
            <CircuitBoard size="15px" color="#020817"/>
            <span>Leaderboard</span>
        </div>

      </div>
    </div>
  )
}

export default Header
