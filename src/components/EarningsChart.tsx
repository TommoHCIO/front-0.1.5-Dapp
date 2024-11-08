import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1E293B',
      titleColor: '#F8FAFC',
      bodyColor: '#F8FAFC',
      padding: 12,
      borderColor: '#334155',
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        title: (items: any[]) => {
          return `${items[0].label}`;
        },
        label: (item: any) => {
          return `${item.formattedValue} CTE`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: '#334155',
        drawBorder: false,
      },
      ticks: {
        color: '#94A3B8',
        font: {
          size: 12,
        },
        callback: (value: number) => `${value} CTE`,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
    point: {
      radius: 4,
      hoverRadius: 6,
    },
  },
};

const generateChartData = (days: number) => {
  const labels = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Generate realistic-looking earning data with an upward trend
  const baseValue = 50;
  const data = labels.map((_, index) => {
    const trend = (index / labels.length) * 100; // Upward trend
    const random = Math.random() * 50 - 25; // Random fluctuation
    return Math.max(baseValue + trend + random, 0);
  });

  return {
    labels,
    datasets: [
      {
        fill: true,
        data,
        borderColor: '#00D1FF',
        backgroundColor: 'rgba(0, 209, 255, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#00D1FF',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
      },
    ],
  };
};

interface EarningsChartProps {
  timeframe: '7d' | '30d' | '90d';
}

export function EarningsChart({ timeframe }: EarningsChartProps) {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data = generateChartData(days);

  return (
    <div className="h-[300px] w-full">
      <Line options={options} data={data} />
    </div>
  );
}