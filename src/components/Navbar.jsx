import React, { useEffect } from 'react'
import { useState } from 'react'
import {Moon, PanelLeft, Sun} from 'lucide-react'
import { useLocation} from 'react-router'
import "../CSS/Navbar.css"

function Navbar() {
    const[search,setSearch]=useState("Search for anything..")
    const location = useLocation();
    const[mode,setmode]=useState(false)
     const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

   //  const width = useWindowWidth();

 useEffect(() => {
    localStorage.setItem("theme", theme);
     document.body.className = theme;
  }, [theme]);


     const setTheme1 = (theme) => {
      setTheme(theme)
    
    setmode(false); 
  };

  // useEffect(()=>{
   
  // })
  // const handleclick = () =>{
  //  if((width<=669) && (click===true)){
  //    setheader("responsive")
  //  }else{
  //    setheader("layout")
  //  }
  //  handlepass(header)
  //  console.log(click)
  // }
 
    
  return (
     <div className="adminnav">
       <div className="headeradmin">
          <PanelLeft />
          <span className="adminhead">Admin {location.pathname}</span>
       </div>
        <input type="text"  className = "searchbar" value={search} onClick={()=>{setSearch("")}} onChange={(e)=>{setSearch(e.target.value)}}/>
       
       <div className="mode">
          {theme==="light"?<Sun size="25px" onClick={()=>{setmode(!mode)}}/>:<Moon size="25px" onClick={()=>{setmode(!mode)}}/>}
            {mode && (
               <div className = "allmodes">
                 <span clasName ="light" onClick={()=>{setTheme1("light")}}>Light</span>
                 <span clasName ="dark" onClick={()=>{setTheme1("dark")}}>Dark</span>
               </div>
            )}
       </div>

      </div>
  )
}

export default Navbar
