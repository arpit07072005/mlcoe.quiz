import React from 'react'
import styles from '../CSS/quiz.module.css'
import Navbar from './Navbar'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from './Header';
function Quiz() {
  return (
    <div className="addusersandheader">
      <Header/>
    <div className={styles.container}>
        <Navbar/>
      <div className={styles.inner_container}>
        <div className={styles.heading}>
            <h2 className={styles.left}>Quiz</h2>
            <button >+ Add New Questions</button>
        </div>
         <div className={styles.table}>
          <DataTable
            paginator
            rows={5}
            responsiveLayout="scroll"
          >
            <Column  header="Title"></Column>
            <Column
              header="Question"
            ></Column>
            <Column
              header="Options"
            ></Column>
            <Column
              header="Correct Answer"
            ></Column>
            <Column
              header="Category"
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Quiz
