import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';

// Styled components for the chart container
const ChartContainer = styled.div`
  width: 100%;
  height: auto;
`;

interface SentimentsData {
  [key: string]: number;
}

interface Props {
  sentiments: SentimentsData;
}

const SentimentsBarChart: React.FC<Props> = ({sentiments}) => {
  const chartRef = useRef<Chart | null>(null);

  const formatData = (): {labels: string[]; data: number[]} => {
    const labels = Object.keys(sentiments);
    const data = Object.values(sentiments);
    return {labels, data};
  };

  useEffect(() => {
    const ctx = document.getElementById(
      "sentiments-bar-chart"
    ) as HTMLCanvasElement;
    if (!ctx) return;

    const {labels, data} = formatData();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Sentiments Breakdown",
            data: data,
            backgroundColor: [
              "rgba(0, 0, 0, 255)",
              "rgba(0, 0, 0, 255)",
              "rgba(0, 0, 0, 255)",
              "rgba(0, 0, 0, 255)",
              "rgba(0, 0, 0, 255)",
              "rgba(0, 0, 0, 255)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Sentiments",
              color: "#000000",
              font: {
                weight: "bold",
                size: 16,
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Count",
              color: "#000000",
              font: {
                weight: "bold",
                size: 16,
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [sentiments]);

  return (
    <ChartContainer>
      <canvas id="sentiments-bar-chart"></canvas>
    </ChartContainer>
  );
};

export default SentimentsBarChart;
