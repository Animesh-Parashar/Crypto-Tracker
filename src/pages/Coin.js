import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header'
import { coinObject } from '../functions/convertObject'
import List from '../components/Dashboard/List'
import CoinInfo from '../components/Coin/Coininfo'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinPrices'
import LineChart from '../components/Coin/LineChart'

import SelectDays from '../components/Coin/SelectDays'
import { settingChartData } from '../functions/settingChartData'
import TogglePriceType from '../components/Coin/PriceType'
function CoinPage() {
    const {id} = useParams()
    const [coinData,setCoinData] = useState()
    const [chartData,setChartData] = useState({})
    const [days,setDays] = useState(60)
    const [priceType, setPriceType] = useState('prices');
    


    
    useEffect(() => {
      if(id){
        getData()
      }

    }, [id])

  async function getData() {
    const data = await getCoinData(id)
    if (data) {
      coinObject(setCoinData,data)
      const prices = await getCoinPrices(id,days,priceType)
      if(prices && prices.length>0){
        settingChartData(setChartData, prices) 
        
      }
    }
    
  }
  
  const handleDaysChange = async (event) => {
    setDays(event.target.value)
    const prices = await getCoinPrices(id,event.target.values,priceType)
      if(prices && prices.length>0){
        settingChartData(setChartData, prices)
        
        
      } 
  }

  const handlePriceTypeChange = async(event, newType) => {
    setPriceType(newType);
    const prices = await getCoinPrices(id,days, newType)
      if(prices && prices.length>0){
        settingChartData(setChartData, prices)
    
     
      } 

      else {
        console.error("Failed to fetch prices")
      }
  };


  return (
    <div>
        <Header/>
       {coinData ? 
       (<>
       <div className='grey-wrapper'> 
        <List coin={coinData} /> 
        </div>
        <div className='grey-wrapper'>
          <SelectDays days ={days} handleDaysChange={handleDaysChange}/>
          <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
        <LineChart chartData={chartData}/>
        </div>
       
       <CoinInfo heading = {coinData.name} desc = {coinData.desc} />
       </>)
        
       :(<> <p>Loading...</p></>)} 
    </div>
  )
}

export default CoinPage