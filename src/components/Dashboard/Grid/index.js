import React, { useEffect, useState } from 'react'
import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from 'react-router-dom';
import Button from '../../Common/Button';
function Grid({coin}) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setIsInWatchlist(watchlist.includes(coin.id));
  }, [coin.id]);

  const toggleWatchlist = (coinId) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    if (!watchlist.includes(coinId)) {
      watchlist.push(coinId);
      alert(`${coinId} Added to Watchlist `)
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
    } else {
      alert(`${coinId} Removed From Watchlist `)
      const updatedWatchlist = watchlist.filter((id) => id !== coinId);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(false);
      
    }
  };

  
  return (
    <Link to = {`/coin/${coin.id}`}>
    <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}` }>
  <div className='info-flex'>
    <img src={coin.image} className='coin-logo' />
    <div className='name-col'>
      <p className='coin-symbol'>{coin.symbol}</p>
      
      <p className='coin-name'>{coin.name}</p>
      <div className='Watchlist'>
              <Button 
                text={isInWatchlist ? "Remove" : "WatchList"} 
                outlined={true} 
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation on button click
                  toggleWatchlist(coin.id);
                }} 
              />
            </div>
    </div>
  </div>
  {coin.price_change_percentage_24h > 0 ? (
    <div  className='chip-flex'>
   
    <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
    <div className='icon-chip'> <TrendingUpRoundedIcon/></div>
    
  </div>

    
  ):(
    <div  className='chip-flex'>
    
    <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
    <div className='icon-chip-red'><TrendingDownRoundedIcon/></div>
    
  </div>

  )}<div className='info -container'>
    <h3 className='coin-price' 
    style ={{
      color:
      coin.price_change_percentage_24h < 0 
      ? "var(--red)":
      "var(--green)", }}>${coin.current_price.toLocaleString()}</h3>
      <p className='total-volume'>Total Volume: {coin.total_volume.toLocaleString()}</p>
      <p className='total-volume'>Market Cap: ${coin.market_cap.toLocaleString()}</p>
  </div>
  
  
  </div>
  </Link>
  )
}

export default Grid