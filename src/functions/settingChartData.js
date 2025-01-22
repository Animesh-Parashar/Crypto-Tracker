import { convertDate } from "./convertDate"

export const settingChartData = (setChartData, prices1,prices2 ) => {
  if (prices2 && Array.isArray(prices2) && prices2.length > 0){
    setChartData({
        labels: prices1.map( (price) => convertDate(price[0]) ),
        datasets: [
          {

            data: prices1.map( (price) => price[1] ),
            borderColor: "#3a80e9",
            borderWidth: 2,
            fill: false,
            tension: 0.25,
            backgroundColor: "rgba(58,128,233,0.1)",
            pointRadius: 0,
         
          },
          {

            data: prices2.map( (price) => price[1] ),
            borderColor: "#61c96f",
            borderWidth: 2,
            fill: false,
            tension: 0.25,

            pointRadius: 0,
         
          },
        ],

      })

  }
  else{
    setChartData({
      labels: prices1.map( (price) => convertDate(price[0]) ),
      datasets: [
        {

          data: prices1.map( (price) => price[1] ),
          borderColor: "#3a80e9",
          borderWidth: 2,
          fill: true,
          tension: 0.25,
    
          pointRadius: 0,
       
        },
      ],

    })

  }
    
}