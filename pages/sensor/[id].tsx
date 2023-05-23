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
const fetcher = async (url: string) => {
  const options = { headers: { Authorization: "7zy6QAzUfr5YMc", }, };
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
export const demo = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    },
  ]
}
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
  const pm1 = data.message.map((item: { pm1: any; }) => item.pm1);
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
  const polPM1 = {
    labels: localTime,
    datasets: [
      {
        label: 'PM1.0',
        data: pm1,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  }
  const polPM1Opt = {
    scales: {
      y: {
        ticks: {
          callback: (value:any) => `${value}`,
          stepSize: 2,
          max: 12,
          min: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },     
  }
  return (
    <>
      <p>Sensor ID: {router.query.id}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
        <div className="shadow-md p-2 rounded">
          <span className="mb-2">PM1.0</span>
          <div>
            <Line options={polPM1Opt} data={polPM1} />
          </div>
        </div>
        <div className="shadow-md p-2 rounded">
          <span className="mb-2">PM2.5</span>
          <div>
            <Line options={options} data={demo} />
          </div>
        </div>
        <div className="shadow-md p-2 rounded">
          <span className="mb-2">PM10</span>
          <div>
            <Line options={options} data={demo} />
          </div>
        </div>
        <div className="shadow-md p-2 rounded">
          <span className="mb-2">Temperature</span>
          <div>
            <Line options={options} data={temperature} />
          </div>
        </div>
        <div className="shadow-md p-2 rounded">
          <span className="mb-2">Humidity</span>
          <div>
            <Line options={options} data={demo} />
          </div>
        </div>
      </div>
    </>
  );
}
