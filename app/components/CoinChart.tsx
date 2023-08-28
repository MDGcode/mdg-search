"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface HistoricalData {
  prices: any[][];
}

export default function CoinChart(props: any) {
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(
    null
  );
  const [days, setDays] = useState(7);
  const url = `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=eur&days=${days}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setHistoricalData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);

  return (
    <>
      <div>
        {historicalData ? (
          <>
            <Line
              data={{
                labels: historicalData.prices?.map((coin: any) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.prices?.map((coin: any) => coin[1]),
                    label: `Price ( past ${days} days) in EUR`,
                    borderColor: "#3B82F6",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div className=" grid md:flex md:justify-between grid-cols-3 gap-4 w-full place-items-center">
              <button
                onClick={() => setDays(1)}
                className=" bg-blue-500 md:px-4 md:py-2 px-2 py-1 rounded-lg hover:opacity-75 duration-300 shadow-lg w-35"
              >
                24 hours
              </button>
              <button
                onClick={() => setDays(7)}
                className=" bg-blue-500 md:px-4 md:py-2 px-2 py-1 rounded-lg hover:opacity-75 duration-300 shadow-lg w-35"
              >
                7 Days
              </button>
              <button
                onClick={() => setDays(14)}
                className=" bg-blue-500 md:px-4 md:py-2 px-2 py-1 rounded-lg hover:opacity-75 duration-300 shadow-lg w-35"
              >
                14 Days
              </button>
              <button
                onClick={() => setDays(30)}
                className=" bg-blue-500 md:px-4 md:py-2 px-2 py-1 rounded-lg hover:opacity-75 duration-300 shadow-lg w-35"
              >
                30 Days
              </button>

              <button
                onClick={() => setDays(60)}
                className=" bg-blue-500 md:px-4 md:py-2 px-2 py-1 rounded-lg hover:opacity-75 duration-300 shadow-lg w-35"
              >
                60 Days
              </button>
              <button
                onClick={() => setDays(365)}
                className=" bg-blue-500 md:px-4 md:py-2 px-2 py-1 rounded-lg hover:opacity-75 duration-300 shadow-lg w-35"
              >
                1 Year
              </button>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
