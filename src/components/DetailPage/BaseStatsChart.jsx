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
  const hasBaseStats = baseStats && Object.keys(baseStats).length > 0;
  const labels = hasBaseStats ? Object.keys(baseStats) : [];
  const values = hasBaseStats ? Object.values(baseStats) : [];

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
            size: window.innerWidth < 480 ? 12 : 20,
          },
        },
      },
    },
  };

  return (
    <Wrapper>
      <ChartTitle>BaseStats</ChartTitle>
      <BarContainer>
        {hasBaseStats ? (
          <Bar data={data} options={options} />
        ) : (
          <Result>Not Found</Result>
        )}
      </BarContainer>
    </Wrapper>
  );
};
BaseStatsChart.propTypes = {
  baseStats: PropTypes.objectOf(PropTypes.number).isRequired,
};
const Wrapper = styled.div``;
const ChartTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin: 8px 0;
`;
const BarContainer = styled.div`
  padding: 8px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const Result = styled.div`
  padding: 8px;
  margin-bottom: 4px;
  background-color: ghostwhite;
  border: 1px solid #979797;
  border-radius: 8px;
  @media (min-width: 480px) {
    font-size: 24px;
  }
`;
export default BaseStatsChart;
