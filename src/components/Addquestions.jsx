import React, { useState } from 'react'
import Navbar from './Navbar'
import { Dropdown } from 'primereact/dropdown'
import Header from './Header'
import "../CSS/Addquestion.css"

function Addquestions() {
      const[name,setName]=useState()
      const[image,setImage]=useState()
     
          const[options,setOptions]=useState()
          const[correct,setCorrect]=useState()
        const [category, setCategory] = useState(null);
        const[sno,setSno]=useState()
        const categories = [
            
        ];
  return (
    <div className="addusersandheader">
      <Header/>
    <div className="addquestions">
      <Navbar/>
       <div className="addusersmain">
              <h3>Add New Question</h3>
              <div className="addusersmaincontent">
                <div className="name">
                      <label for ="S.no" className="name">S.No</label>
                      <input type="text" placeholder="Enter Serial No." className="nameinput" value={sno} onChange={(e)=>{setSno(e.target.value)}}  onClick={()=>{setSno("")}}/>
                  </div>
                  <div className="name">
                      <label for ="name" className="name">Name</label>
                      <input type="text" placeholder="Enter Name" className="nameinput" value={name} onChange={(e)=>{setName(e.target.value)}}  onClick={()=>{setName("")}}/>
                  </div>
                  <div className="image">
                      <label for ="image" className="name">Image</label>
                      <input type="file" placeholder="Choose File" className="nameinput" value={image} onChange={(e)=>{setImage(e.target.files)}} />
                  </div>
                  <div className="role">
                     <label for ="role" className="role">Category</label>
                     <Dropdown
                        value={category}
                          options={categories}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="Categories"
                          showClear
                          className="nameinput"
                      />
                  </div>
                  <div className="studentno">
                        <label for ="studentno" className="name">Correct Answer</label>
                       <input type="text" placeholder="Enter Correct Answer" className="nameinput" value={correct} onChange={(e)=>{setCorrect(e.target.value)}}  />
                  </div>
                  <div className="email">
                       <label for ="email" className="name">Options</label>
                      <textarea type="text"  placeholder="Enter options" className="nameinput" value={options} onChange={(e)=>{setOptions(e.target.value)}}  onClick={()=>{setOptions("")}} />
                  </div>
                  <button className = "addusersbutton">Submit</button>
                  
                  
              </div>
            </div>
    </div>
    </div>
  )
}

export default Addquestions
