import React, { useState } from "react";

import CoinItem from "./CoinItem";
export default function CoinSearch(props: any) {
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="rounded-div my-4 bg-slate-900">
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
          <h1 className="text-2xl font-bold my-2">Search Crypto</h1>
          <div>
            <input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="Search a coin"
              className="  w-full border-input px-4 py-2 rounded-2xl shadow-xl bg-[#324965]"
            />
          </div>
        </div>
        <table className=" w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <th></th>
              <th className="px-4">#</th>
              <th className="text-left">Coin</th>
              <th></th>
              <th>Price</th>
              <th>24h</th>
              <th className="hidden md:table-cell">24h Volume</th>
              <th className="hidden sm:table-cell">Mkt</th>
              <th>Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {props.coins
              .filter((value: any) => {
                if (query === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((coin: any) => {
                return <CoinItem coin={coin} key={coin.id} />;
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
