import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import "./post.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const Posts: React.FC = () => {
  const data = {
    labels: [
      "March 2024",
      "April 2024",
      "May 2024",
      "June 2024",
      "July 2024",
      "August 2024",
      "September 2024",
      "October 2024",
    ],
    datasets: [
      {
        label: "Views",
        data: [50, 55, 60, 45, 65, 70, 80, 85],
        borderColor: "#FCC54C",
        backgroundColor: "#FCC54C",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#FCC54C",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#E5E5E5",
          drawBorder: false,
        },
        ticks: {
          stepSize: 20,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="post-container mt-10">
      <div className="chart-section">
        <div className="flex items-center mb-5">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          View Posts
        </div>
        <div className="chart-wrapper">
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="satisfaction-section">
        <div className="flex items-center mb-5">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          Satisfaction Of Posts
        </div>
        <div className="satisfaction-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="satisfaction-item cursor-pointer">
              <span className="month w-full">Month {index + 1}</span>
              <br />
              <span className="emoji">😊</span>
              <br />
              <span className="points">{20} Points</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
