import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'

import Search from '../components/Dashboard/Search'; 
import { get100Coins } from '../functions/get100Coins';

function DashboardPage() {

    const [coins,setCoins] = useState([]);
    const [search, setSearch] = useState("")

    const onSearchChange = (e) => {
        setSearch(e.target.value)
    }

    var filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())  )

    useEffect (() => {
        getData()
    }, []);

    const getData = async() => {
        const myCoins = await get100Coins()
        if (myCoins) {
            setCoins(myCoins)

        }
        

    }
  return (
    <div>
        <Header />
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent coins= {filteredCoins}/>
    </div>
  )
}

export default DashboardPage