import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function Barchart({ chartData }) {
  return (
    <div>
      <Bar
        data={chartData}
        height={120}
        options={{ maintainAspectRatio: true }}
      />
      <h2 className="barcharttxt">
        Number Of Customers and Total Open Amount / 1000000{" "}
      </h2>
    </div>
  );
}

export default Barchart;
