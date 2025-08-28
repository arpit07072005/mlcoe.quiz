import React, { useState } from 'react'
import Navbar from './Navbar'
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Header from './Header';
import "../CSS/Question.css"

function Questions() {
    const [globalFilter, setGlobalFilter] = useState("");
    const [category, setCategory] = useState(null);
    const categories = [
        
    ];
  return (
    <div className="addusersandheader">
        <Header/>
    <div className = "Questions">
      <Navbar/>
         <div className="usersmaincontent">
        <div className="usernumber">
            <h2>Questions (10)</h2>
            <span className = "manageusers">Manage  Questions (Server side table functionalities.)</span>
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
                          value={category}
                          options={categories}
                          onChange={(e) => setCategory(e.target.value)}
                          placeholder="Categories"
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
                      <Column field="S.no" header="S.No"></Column>
                       <Column field="image" header="Image"></Column>
                      <Column field="name" header="Name"></Column>
                      <Column field="category" header="Category"></Column>
                      <Column field="options" header="Options"></Column>
                      <Column field="correct" header="Correct Answer"></Column>
                  </DataTable>
              </div>
    </div>
    </div>
  )
}

export default Questions
