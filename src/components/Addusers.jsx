import React, { useState } from 'react'
import Navbar from './Navbar'
import { Dropdown } from 'primereact/dropdown';
import Header from './Header';
import "../CSS/Adduser.css"

function Addusers() {
    const[name,setName]=useState()
     const roles = [
            { label: "Admin", value: "Admin" },
            { label: "User", value: "User" }
        ];
    const[role,setRole]=useState()
    const[email,setEmail]=useState()
    const[studentno,setStudentno]=useState()

  return (
    <div className="addusersandheader">
      <Header/>
    <div className="Addusers">
      <Navbar/>
      <div className="addusersmain">
        <h3>Add New User</h3>
        <div className="addusersmaincontent">
            <div className="name">
                <label for ="name" className="name">Name</label>
                <input type="text" placeholder="Enter Name" className="nameinput" value={name} onChange={(e)=>{setName(e.target.value)}}  onClick={()=>{setName("")}}/>
            </div>
            <div className="role">
               <label for ="role" className="role">Role</label>
               <Dropdown
                 value={role}
                 options={roles}
                 onChange={(e) => setRole(e.target.value)}
                 placeholder="Select Role"
                 showClear
                 className="nameinput"
             />
            </div>
            <div className="email">
                 <label for ="email" className="name">Email</label>
                <input type="text"  placeholder="Enter email" className="nameinput" value={email} onChange={(e)=>{setEmail(e.target.value)}}  onClick={()=>{setEmail("")}} />
            </div>
            
            <div className="studentno">
                  <label for ="studentno" className="name">Student no.</label>
                 <input type="text" placeholder="Enter student no." className="nameinput" value={studentno} onChange={(e)=>{setStudentno(e.target.value)}}  onClick={()=>{setStudentno("")}}/>
            </div>
            <button className = "addusersbutton">Submit</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Addusers
