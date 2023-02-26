import React from "react";
import { Pie } from "react-chartjs-2";
import "../showdata.css";
function Piechart({ chartData }) {
  return (
    <div>
      <Pie
        data={chartData}
        height={120}
        options={{ maintainAspectRatio: true }}
      />
      <h2 className="piecharttxt">
        INVOICE
        <br /> CURRENCY
      </h2>
    </div>
  );
}

export default Piechart;
