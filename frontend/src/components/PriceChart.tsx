import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { PriceHistory } from "../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type PriceChartProps = {
  history: PriceHistory[];
};

export default function PriceChart({ history }: PriceChartProps) {
  if (history.length === 0) {
    return <p>Aucun historique de prix disponible</p>;
  }

  const chartHistory = [...history].reverse();

  const data = {
    labels: chartHistory.map((item) =>
      new Date(item.created).toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    ),

    datasets: [
      {
        label: "Prix",
        data: chartHistory.map((item) => item.price),

        borderColor: "#fa5e52",
        backgroundColor: "rgba(250, 94, 82, 0.1)",

        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#fa5e52",

        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
      },

      tooltip: {
        callbacks: {
          label: (context: any) => {
            return ` ${context.parsed.y.toFixed(2)} €`;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: false,

        ticks: {
          callback: (value: string | number) => {
            return `${value} €`;
          },
        },
      },

      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}