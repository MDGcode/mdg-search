import { useRouter } from "next/navigation";
import { AiOutlineStar } from "react-icons/ai";
import { Sparklines, SparklinesLine } from "react-sparklines";
export default function CoinItem({ coin }: { coin: any }) {
  const router = useRouter();
  function handleClick() {
    router.push("/Coin?id=" + coin.id);
  }
  return (
    <tr
      onClick={handleClick}
      className=" cursor-pointer h-20 border-b overflow-hidden"
    >
      <td>
        <AiOutlineStar />
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <div className="flex items-center">
          <img
            src={coin.image}
            alt={coin.id}
            className="w-6 mr-2 rounded-full"
          />
          <p className="hidden sm:table-cell">{coin.name}</p>
        </div>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>€{coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0 ? (
          <p className="text-green-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className=" w-44 hidden md:table-cell">
        €{coin.total_volume.toLocaleString()}
      </td>
      <td className=" w-44 hidden sm:table-cell">
        €{coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          {coin.price_change_percentage_24h > 0 ? (
            <SparklinesLine color="teal" />
          ) : (
            <SparklinesLine color="red" />
          )}
        </Sparklines>
      </td>
    </tr>
  );
}
