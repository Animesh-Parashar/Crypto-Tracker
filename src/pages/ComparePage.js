import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDays';
import { coinObject } from '../functions/convertObject';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/Coininfo';
import { settingChartData } from '../functions/settingChartData';
import LineChart from '../components/Coin/LineChart';

function ComparePage() {
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [days, setDays] = useState(30);
    const [crypto1Data, setCrypto1Data] = useState({});
    const [crypto2Data, setCrypto2Data] = useState({});
    const [priceType,setPriceType] = useState("prices")
    const [chartData,setChartData] = useState([])


    function handleDaysChange(event) {
        setDays(event.target.value);
    }

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      console.log("Data for first crypto", data1);
      console.log("Data for second crypto", data2);
      if (data1){
         coinObject(setCrypto1Data, data1);
      }
      if (data2) coinObject(setCrypto2Data, data2);
  
      if (data1 && data2) {
          const prices1 = await getCoinPrices(crypto1, days, priceType);
          const prices2 = await getCoinPrices(crypto2, days, priceType);
            settingChartData(setChartData,prices1,prices2)
          if (Array.isArray(prices1) && prices1.length > 0 && Array.isArray(prices2) && prices2.length > 0) {
              console.log("Prices Fetched", prices1, prices2);
          } else {
              console.error("Failed to fetch prices or prices are empty:", { prices1, prices2 });
          }
      }
  }

  const handleCoinChange = async (event, isCoin2) => {
    const selectedCoin = event.target.value;

    if (isCoin2) {
        setCrypto2(selectedCoin);
        const data = await getCoinData(selectedCoin);
        coinObject(setCrypto2Data, data); 

        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        if (prices1.length > 0 && prices2.length > 0){

        }
    } else {
        setCrypto1(selectedCoin);
        const data = await getCoinData(selectedCoin);
        coinObject(setCrypto1Data, data); 
    }

    
};

    return (
        <div>
            <Header />
          
            
                {Object.keys(crypto1Data).length > 0 && Object.keys(crypto2Data).length > 0 ? 
                (<> <div className="coin-days-flex">
                    <SelectCoins
                    crypto1={crypto1}
                    handleCoinChange={handleCoinChange}
                    crypto2={crypto2}/> 
                    <SelectDays days={days} handleDaysChange={handleDaysChange} />
                    </div>
                    
                    <div className='grey-wrapper'> 
                    <List coin={crypto1Data} /> </div>
                    <div className='grey-wrapper'> 
                    <List coin={crypto2Data} /> </div>
                    <LineChart chartData={chartData}/>
                    <CoinInfo heading = {crypto1Data.name} desc = {crypto1Data.desc} />
                    <CoinInfo heading = {crypto2Data.name} desc = {crypto2Data.desc} />
                </>
                    ) 
                        : (<p>Loading......</p>)}

                        
                
            
        </div>
    );
}

export default ComparePage;
