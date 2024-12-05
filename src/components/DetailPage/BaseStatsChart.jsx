import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BaseStatsChart = ({ baseStats }) => {
  const labels = Object.keys(baseStats);
  const values = Object.values(baseStats);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Base Stats",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 255,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          align: "center",
          mirror: true,
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <div>
      <ChartTitle>BaseStats</ChartTitle>
      <BarContainer>
        <Bar data={data} options={options} />
      </BarContainer>
    </div>
  );
};
BaseStatsChart.propTypes = {
  baseStats: PropTypes.objectOf(PropTypes.number).isRequired,
};
const ChartTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin: 8px 0;
`;
const BarContainer = styled.div`
  background-color: #f2f2f2;
  border-radius: 8px;
`;
export default BaseStatsChart;
