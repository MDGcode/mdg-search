"use client";

import { useEffect, useState } from "react";
import CoinSearch from "./components/CoinSearch";
import axios from "axios";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url]);
  if (Object.keys(coins).length === 0)
    return (
      <>
        <Loading />
      </>
    );
  return (
    <>
      <CoinSearch coins={coins} />
      <Footer />
    </>
  );
}
