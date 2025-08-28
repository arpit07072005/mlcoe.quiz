import React, { useEffect, useState } from 'react'
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PreResult({answeredQuestions,markedForReview,notAnswered,visitedQuestions}) {
    const [chartData, setChartData] = useState(null);
    const totalQuestions=50;
    useEffect(()=>{
        setChartData({
    labels: ["Answered", "Not Answered", "Marked", "Not Visited"],
    datasets: [
      {
        label: "Quiz Summary",
        data: [
          answeredQuestions,
          notAnswered,
          markedForReview,
          totalQuestions - visitedQuestions
        ],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#8AFF33"],
        borderColor: ["#36A2EB", "#FF6384", "#FFCE56", "#8AFF33"],
        borderWidth: 2,
      },
    ],
  });
    })
  return (
    <div className="preresult">
         {chartData && (
    
      <div style={{ width: "500px", height: "500px" }}>
  <Doughnut 
    data={chartData} 
    options={{ maintainAspectRatio: false }} 
  />
</div>
    
         )}
           <div className="summary">
          <h4>Summary</h4>
          <div className="summary-grid">
            <div className="summary-item answered-summary">
              <strong>Answered</strong>
              <span>{answeredQuestions}</span>
            </div>
            <div className="summary-item not-answered-summary">
              <strong>Not Answered</strong>
              <span>{notAnswered}</span>
            </div>
            <div className="summary-item marked-summary">
              <strong>Marked</strong>
              <span>{markedForReview}</span>
            </div>
            <div className="summary-item not-visited-summary">
              <strong>Not Visited</strong>
              <span>{totalQuestions - visitedQuestions}</span>
            </div>
          </div>
        </div>
        <button className='submit-btn2'>Submit</button>
      
    </div>
  )
}

export default PreResult
