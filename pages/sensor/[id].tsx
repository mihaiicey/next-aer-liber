import React, { useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatTimestamp } from "../../lib/times";
const fetcher = async (url: string) => {const options = {headers: {Authorization: "7zy6QAzUfr5YMc",},};
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

export default function Page() {
  const router = useRouter();
  const id = router.query.id;
  const [sensor, setSensor] = useState("all");
  const [startInt, setStartInt] = useState('0');
  const [endInt, setEndInt] = useState();

  const { data, error } = useSWR(
    id
      ? `${
          process.env.NEXT_PUBLIC_URL
        }/api/urad/sensors?id=${id}&sensor=${sensor}&startInt=${startInt}${
          endInt ? `&endInt=${endInt}` : ""
        }`
      : null,
    fetcher,
    {
      revalidateOnFocus: true,
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <>Loading</>;
  const timelocalValues = data.message.map((item: { timelocal: []; }) => item.timelocal);
  const localTime = data.message.map((item: { time: number }) => formatTimestamp(item.time));
  const temperatura = data.message.map((item: { temperature: any; }) => item.temperature);

  const temperature = {
    labels: localTime,
    datasets: [
      {
        label: 'temperature',
        data: temperatura,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <>
      <p>Sensor ID: {router.query.id}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
        <div>
          {" "}
          <Line options={options} data={temperature} />
        </div>
        <div>2</div>
        <div>3</div>
      </div>
    </>
  );
}
