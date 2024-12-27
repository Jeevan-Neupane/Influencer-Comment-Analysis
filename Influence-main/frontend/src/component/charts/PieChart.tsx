import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "styled-components";

// Styled components for the chart container
const ChartContainer = styled.div`
  width: 100%;
  height: auto;
`;

interface SentimentData {
  label: string;
  value: number;
}

interface Props {
  sentiments: {[key: string]: number};
}

const SentimentPieChart: React.FC<Props> = ({sentiments}) => {
  const chartRef = useRef<Chart | null>(null);

  const formatData = (): SentimentData[] => {
    const data: SentimentData[] = [];
    for (const [sentiment, value] of Object.entries(sentiments)) {
      data.push({label: sentiment, value});
    }
    return data;
  };

  useEffect(() => {
    const ctx = document.getElementById(
      "sentiment-pie-chart"
    ) as HTMLCanvasElement;
    if (!ctx) return;

    const data = formatData();
    const labels = data.map((item) => item.label);
    const values = data.map((item) => item.value);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    //disable typescript error
    // @ts-ignore
    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ": " + tooltipItem.raw.toFixed(2);
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "bottom",
          labels: {
            color: "#ffffff", // Legend label text color (white)
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
      <canvas id="sentiment-pie-chart"></canvas>
    </ChartContainer>
  );
};

export default SentimentPieChart;
