import React from 'react'
import styles from '../CSS/newquiz.module.css'
import Navbar from './Navbar'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Header from './Header';
function NewQuiz() {
  return (
     <div className="addusersandheader">
      <Header/>
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.inner_container}>
          <div className={styles.heading}>
            <h2>Create New Quiz</h2>
            <p>Fill out the form to create a new quiz</p>
            <div className={styles.title}>
              <h4>Quiz title</h4>
              <input type="text"  placeholder='Enter quiz title' className={styles.input}/>
            </div>
            <div className={styles.table}>
 <DataTable
            paginator
            rows={5}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>

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
            <div className={styles.buttons}>
              <button className={styles.button}>Create Quiz</button>
            </div>
          </div>
        </div>
     
    </div>
    </div>
  )
}

export default NewQuiz
