import React from "react";
import "./index.css";

export default function Academics() {
  return (
    <div className="container">
      <div>
        <h1>List of Modules Taught</h1>
        <table>
          <tr>
            <th>Module Code</th>
            <th>Module Title</th>
          </tr>
          <tr>
            <td>BT1101</td>
            <td>Introduction to Business Analytics</td>
          </tr>
          <tr>
            <td>BT2101</td>
            <td>Econometrics Modelling for Business Analytics</td>
          </tr>
          <tr>
            <td>BT2102</td>
            <td>Data Management and Visualisation</td>
          </tr>
          <tr>
            <td>BT2103</td>
            <td>Optimization Methods in Business Analytics</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
