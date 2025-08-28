import React, { useState } from 'react'
import Navbar from './Navbar'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";  // Theme
import "primereact/resources/primereact.min.css"; // Core styles
import "primeicons/primeicons.css"; // Icons
import Header from './Header';
import "../CSS/User.css"

function Users() {
    //  const [users, setUsers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [gender, setGender] = useState(null);

    const genders = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" }
    ];

    // useEffect(() => {
    //     // Fetch or set your data here
    //     setUsers([
    //         // Example data
    //         { name: "John Doe", email: "john@example.com", role: "Admin", gender: "Male", joined: "2025-01-01" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //         { name: "Jane Smith", email: "jane@example.com", role: "User", gender: "Female", joined: "2025-03-15" },
    //     ]);
    // }, []);
  return (
    <div className="addusersandheader">
        <Header/>
    <div className="users">
      <Navbar/>
      <div className="usersmaincontent">
        <div className="usernumber">
            <h2>Users 0</h2>
            <span className = "manageusers">Manage Users (Server side table functionalities.)</span>
        </div>
        <button className="addnew">+ Add new</button>
      </div>
       <div className="card">
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <InputText
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search name..."
                    className="searchbar1"
                />
                <Dropdown
                    value={gender}
                    options={genders}
                    onChange={(e) => setGender(e.value)}
                    placeholder="Gender"
                    showClear
                    className="dropdown"
                />
            </div>

            <DataTable className='datatable'
                // value={[0,1].filter(
                //     (u) =>
                //         (!gender || u.gender === gender) &&
                //         (!globalFilter || u.name.toLowerCase().includes(globalFilter.toLowerCase()))
                // )}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                emptyMessage="No results."
            >
                <Column selectionMode="multiple" className='table'></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="role" header="Role"></Column>
                <Column field="joined" header="Joined"></Column>
            </DataTable>
        </div>
    </div>
    </div>
  )
}

export default Users
