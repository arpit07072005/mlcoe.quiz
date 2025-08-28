import { Activity, Clock3, FileQuestionMark, Plus, Trophy, User } from 'lucide-react'
import Navbar from './Navbar'
import Header from './Header'
import "../CSS/Dashboard.css"



function Dashboard() {
  return (
    <div className="addusersandheader">
      <Header/>
    <div className = "dashboard" >
      <Navbar/>
      <div className="maincontent">
        <div className="totalusers">
          <div className="headinglogo">
            <span className="totalhead">Total Users</span>
            <User size="20px" color="#6B7280"/>
          </div>
          <div className="values">
            <span className ="value">1,234</span>
            <span className="stats">+5.2% from last month</span>
          </div>
        </div>
         <div className="totalusers">
          <div className="headinglogo">
            <span className="totalhead">New Registrations</span>
            <Plus size="20px" color="#6B7280"/>
          </div>
          <div className="values">
            <span className ="value">+124</span>
            <span className="stats">+12.4% from last month</span>
          </div>
        </div>
         <div className="totalusers">
          <div className="headinglogo">
            <span className="totalhead">Active Users</span>
            < Activity size="20px" color="#6B7280"/>
          </div>
          <div className="values">
            <span className ="value">+873</span>
            <span className="stats">+8.7% from last month</span>
          </div>
        </div>
          <div className="totalusers1">
          <div className="headinglogo">
            <span className="totalhead">Active Users</span>
            < FileQuestionMark size="20px" color="#6B7280"/>
          </div>
          <div className="values">
            <span className ="value">+873</span>
            <span className="stats">+8.7% from last month</span>
          </div>
        </div>
        <div className="totalusers2">
          <div className="headinglogo">
            <span className="totalhead">Recent Registrations</span>
            < Clock3 size="20px" color="#6B7280"/>
          </div>
          <div className="participation">
          <div className="head1">
          <div className="mlcoelogo">
            <img src ="https://img.icons8.com/ios-filled/50/user.png" alt="/" height="100%" width="100%" />
          </div>
          <div className="mlcoename">
            <span className="mlcoe">John Doe</span>
            <span className="society1">Registered 2 hours ago</span>
            </div>
          </div>
            <div className="head1">
          <div className="mlcoelogo">
            <img src ="https://img.icons8.com/ios-filled/50/user.png" alt="/" height="100%" width="100%" />
          </div>
          <div className="mlcoename">
            <span className="mlcoe">Jane Smith</span>
            <span className="society1">Registered 4 hours ago</span>
            </div>
          </div>
            <div className="head1">
          <div className="mlcoelogo">
            <img src ="https://img.icons8.com/ios-filled/50/user.png" alt="/" height="100%" width="100%" />
          </div>
          <div className="mlcoename">
            <span className="mlcoe">Bob Johnson</span>
            <span className="society1">Registered 6 hours ago</span>
            </div>
          </div>
          </div>
          

        </div>
         <div className="totalusers2">
          <div className="headinglogo">
            <span className="totalhead">Recent Quiz Completions</span>
            < Trophy size="20px" color="#6B7280"/>
          </div>
          <div className="participation">
          <div className="head1">
          <div className="mlcoelogo">
            <img src ="https://img.icons8.com/ios-filled/50/user.png" alt="/" height="100%" width="100%" />
          </div>
          <div className="mlcoename">
            <span className="mlcoe">John Doe</span>
            <span className="society1">Completed "JavaScript Fundamentals" quiz 2 hours ago</span>
            </div>
          </div>
            <div className="head1">
          <div className="mlcoelogo">
            <img src ="https://img.icons8.com/ios-filled/50/user.png" alt="/" height="100%" width="100%" />
          </div>
          <div className="mlcoename">
            <span className="mlcoe">Jane Smith</span>
            <span className="society1">Completed "React Basics" quiz 4 hours ago</span>
            </div>
          </div>
            <div className="head1">
          <div className="mlcoelogo">
            <img src ="https://img.icons8.com/ios-filled/50/user.png" alt="/" height="100%" width="100%" />
          </div>
          <div className="mlcoename">
            <span className="mlcoe">Bob Johnson</span>
            <span className="society1">Completed "SQL Fundamentals" quiz 6 hours ago</span>
            </div>
          </div>
          </div>
          

        </div>
        
      </div>
    </div>
    </div>
  )
}

export default Dashboard
