"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Sparklines, SparklinesLine } from "react-sparklines";
import DOMPurify from "dompurify";
import Footer from "../components/Footer";
import CoinChart from "../components/CoinChart";
import Loading from "../components/Loading";
import NewsItem from "../components/NewsItem";

interface CoinData {
  liquidity_score: number;
  tickers: any[];
  hashing_algorithm: string;
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  description: {
    en: string;
  };
  image: {
    small: string;
    large: string;
  };
  market_data: {
    sparkline_7d: {
      price: any[];
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_1y: number;
    circulating_supply: number;
    total_volume: {
      eur: number;
    };
    market_cap: {
      eur: number;
    };
    current_price: {
      eur: number;
    };
    low_24h: {
      eur: number;
    };
    high_24h: {
      eur: number;
    };
    price_change_percentage_1h_in_currency: {
      eur: number;
    };
    price_change_percentage_24h_in_currency: {
      eur: number;
    };
    price_change_percentage_7d_in_currency: {
      eur: number;
    };
    price_change_percentage_14d_in_currency: {
      eur: number;
    };
    price_change_percentage_30d_in_currency: {
      eur: number;
    };
    price_change_percentage_1y_in_currency: {
      eur: number;
    };
  };
  // Add other properties as needed
}

interface ArticleData {
  author: string;
  content: string;
  description: string;
  title: string;
  url: string;
  urlToImage: string;
}

interface NewsData {
  status: string;
  totalResults: string;
  articles: ArticleData[];
}

interface CoinProps {
  searchParams: {
    id: string;
  };
}

export default function Coin(props: CoinProps) {
  const { searchParams } = props;
  const { id } = searchParams;
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [news, setNews] = useState<NewsData | null>(null);
  const [days, setDays] = useState(1);
  const [criteria, setCriteria] = useState("popularity");
  const coinUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`;

  useEffect(() => {
    axios
      .get(coinUrl)
      .then((response) => {
        setCoin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [coinUrl]);
  function getDateDaysAgo(days: number) {
    let d = new Date();
    d.setDate(d.getDate() - days);
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const date = d.getDate();
    return `${year}-${month}-${date}`;
  }
  const newsUrl = `https://newsapi.org/v2/everything?q=+${
    coin?.name
  }+crypto&from=${getDateDaysAgo(days)}&sortBy=${criteria}&apiKey=${
    process.env.NEXT_PUBLIC_NEWS_API_KEY
  }`;
  console.log(getDateDaysAgo(7));
  useEffect(() => {
    axios
      .get(newsUrl)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newsUrl]);
  const handleSelectChangeDays = (event: any) => {
    const selectedValue = parseInt(event.target.value);
    setDays(selectedValue);
  };
  const handleSelectChangeCriteria = (event: any) => {
    const selectedValue = event.target.value;
    setCriteria(selectedValue);
  };
  if (!coin) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <div className=" my-12 py-8">
        <div className="flex py-8 rounded-div justify-between">
          <img className="w-20 mr-8" src={coin.image.large} alt={coin.id} />
          <div>
            <div>
              <p className="text-3xl font-bold">{coin.name}</p>
              <p>({coin.symbol.toUpperCase()} / EUR)</p>
            </div>
          </div>
          <div className="">
            <p className="text-3xl font-bold">
              €{coin.market_data.current_price.eur.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="rounded-div grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
          <div>
            <div className="flex justify-between"></div>
            {/**<div>
              <Sparklines data={coin.market_data.sparkline_7d.price}>
                {coin.market_data.price_change_percentage_7d > 0 ? (
                  <SparklinesLine color="teal" />
                ) : (
                  <SparklinesLine color="red" />
                )}
              </Sparklines>
            </div> */}

            <div className="flex justify-between py-4 ">
              <div>
                <p className="text-gray-300 text-sm">Market Cap</p>
                {coin.market_data.market_cap ? (
                  <p>€{coin.market_data.market_cap.eur.toLocaleString()}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Volume 24h</p>
                {coin.market_data.total_volume ? (
                  <p>€{coin.market_data.total_volume.eur.toLocaleString()}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <div className="flex justify-between py-4 ">
              <div>
                <p className="text-gray-300 text-sm">24h High</p>
                {coin.market_data.high_24h ? (
                  <p>€{coin.market_data.high_24h.eur.toLocaleString()}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">24h Low</p>
                {coin.market_data.low_24h ? (
                  <p>€{coin.market_data.low_24h.eur.toLocaleString()}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xl font-bold">Market Stats</p>
            <div className="flex justify-between py-4">
              <div>
                <p className="text-gray-300 text-sm">Market Rank</p>
                {coin.market_cap_rank}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Hashing Algorithm</p>
                {coin.hashing_algorithm ? (
                  <p>{coin.hashing_algorithm}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Trust score</p>
                {coin.tickers ? (
                  <p>{coin.liquidity_score.toFixed(2)}</p>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <div className="flex justify-between py-4">
              <div>
                <p className="text-gray-300 text-sm">Price Change (24h)</p>
                {coin.market_data ? (
                  <span>
                    {coin.market_data.price_change_percentage_24h > 0 ? (
                      <p className="text-green-600">
                        {coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {coin.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}
                        %
                      </p>
                    )}
                  </span>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Price Change (7d)</p>
                {coin.market_data ? (
                  <span>
                    {coin.market_data.price_change_percentage_7d > 0 ? (
                      <p className="text-green-600">
                        {coin.market_data.price_change_percentage_7d.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {coin.market_data.price_change_percentage_7d.toFixed(2)}
                        %
                      </p>
                    )}
                  </span>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Price Change (14d)</p>
                {coin.market_data ? (
                  <span>
                    {coin.market_data.price_change_percentage_14d > 0 ? (
                      <p className="text-green-600">
                        {coin.market_data.price_change_percentage_14d.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {coin.market_data.price_change_percentage_14d.toFixed(
                          2
                        )}
                        %
                      </p>
                    )}
                  </span>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
            <div className="flex justify-between py-4">
              <div>
                <p className="text-gray-300 text-sm">Price Change(30d)</p>
                {coin.market_data ? (
                  <span>
                    {coin.market_data.price_change_percentage_30d > 0 ? (
                      <p className="text-green-600">
                        {coin.market_data.price_change_percentage_30d.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {coin.market_data.price_change_percentage_30d.toFixed(
                          2
                        )}
                        %
                      </p>
                    )}
                  </span>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Price Change(60d)</p>
                {coin.market_data ? (
                  <span>
                    {coin.market_data.price_change_percentage_60d > 0 ? (
                      <p className="text-green-600">
                        {coin.market_data.price_change_percentage_60d.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {coin.market_data.price_change_percentage_60d.toFixed(
                          2
                        )}
                        %
                      </p>
                    )}
                  </span>
                ) : (
                  <p>-</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Price Change(1y)</p>
                {coin.market_data ? (
                  <span>
                    {coin.market_data.price_change_percentage_1y > 0 ? (
                      <p className="text-green-600">
                        {coin.market_data.price_change_percentage_1y.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className="text-red-600">
                        {coin.market_data.price_change_percentage_1y.toFixed(2)}
                        %
                      </p>
                    )}
                  </span>
                ) : (
                  <p>-</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-div">
          <CoinChart id={coin.id} />
        </div>
        <div className="pt-10 rounded-div">
          <p className="text-xl font-bold">About {coin.name}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin.description ? coin.description.en : ""
              ),
            }}
          ></p>
        </div>
        <div className="rounded-div py-10 mb-10">
          <p className="text-xl font-bold pb-5">News for {coin.name}</p>
          <div className=" flex justify-start gap-4 pb-8">
            <div className="relative w-fit lg:max-w-sm">
              <div>
                <span>From: </span>
                <select
                  onChange={handleSelectChangeDays}
                  value={days}
                  className="w-fit p-2.5 text-white bg-transparent border rounded-md shadow-sm outline-none appearance-none focus:border-blue-400"
                >
                  <option className="bg-[#1b2838]" value={1}>
                    Last 24 hours
                  </option>
                  <option className="bg-[#1b2838]" value={7}>
                    Last 7 days
                  </option>
                  <option className="bg-[#1b2838]" value={14}>
                    Last 14 days
                  </option>
                  <option className="bg-[#1b2838]" value={30}>
                    Last Month
                  </option>
                </select>
              </div>
            </div>
            <div className="relative w-fit lg:max-w-sm">
              <span>Sort by: </span>
              <select
                onChange={handleSelectChangeCriteria}
                value={criteria}
                className="w-fit p-2.5 text-white bg-transparent border rounded-md shadow-sm outline-none appearance-none focus:border-blue-400"
              >
                <option className="bg-[#1b2838]" value={"popularity"}>
                  Popularity
                </option>
                <option className="bg-[#1b2838]" value={"relevancy"}>
                  Relevancy
                </option>
                <option className="bg-[#1b2838]" value={"publishedAt"}>
                  Newest
                </option>
              </select>
            </div>
          </div>
          <div className=" grid grid-cols-1 gap-12 md:grid-cols-2">
            {news?.articles.map((article: any, index: number) => {
              return (
                <NewsItem
                  key={index}
                  img={article.urlToImage}
                  title={article.title}
                  url={article.url}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
