import React from 'react';
import App from './App';
import "./App.css";

function InfoBox({ title, cases, total }) {
  return (
    <div class="card">
    <div class="container">
      <h4 className='infoBox-title'><b>{title}</b></h4>
      <h2 className="infoBox-cases">{cases}</h2>
      <p className='infoBox-total'>{total} Total</p>
    </div>
  </div>
  )
}

export default InfoBox
