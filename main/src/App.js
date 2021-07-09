import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Coin } from "./component/Coin";

const api =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(api)
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  console.log(coins);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coins) => {
    return coins.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-ap">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            placeholder="Search"
            onChange={handleChange}
          />
        </form>
      </div>

      {loading ? (
        <p className="loading">Loading......</p>
      ) : (
        filteredCoins &&
        filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              volume={coin.market_cap}
              price={coin.current_price}
              symbol={coin.symbol}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.total_volume}
            />
          );
        })
      )}
    </div>
  );
}

export default App;
