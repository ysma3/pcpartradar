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
  const data = {
    labels: history.map((item) =>
      new Date(item.created).toLocaleDateString("fr-FR")
    ),
    datasets: [
      {
        label: "Prix",
        data: history.map((item) => item.price),
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}