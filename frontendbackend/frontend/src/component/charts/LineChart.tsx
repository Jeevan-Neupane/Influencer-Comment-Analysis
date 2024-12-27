import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import moment from 'moment';

interface Props {
  videos: { title: string; date: string; views: number }[];
}

const LineChart: React.FC<Props> = ({ videos }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // Aggregate views by date
      const viewsByDate: { [date: string]: number } = {};

      videos.forEach((video) => {
        const date = moment(video.date).format('YYYY-MM-DD');
        if (viewsByDate[date]) {
          viewsByDate[date] += video.views;
        } else {
          viewsByDate[date] = video.views;
        }
      });

      // Sort aggregated data by date
      const sortedDates = Object.keys(viewsByDate).sort((a, b) => moment(a).valueOf() - moment(b).valueOf());
      const labels = sortedDates.map((date) => moment(date).toDate());
      const values = sortedDates.map((date) => viewsByDate[date]);

      // Create the chart
      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Video Views',
              data: values,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [videos]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
