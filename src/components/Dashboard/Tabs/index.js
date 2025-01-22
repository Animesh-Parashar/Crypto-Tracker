import React, {useState} from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '../Grid';
import "./styles.css"

import List from '../List';
import { color } from 'framer-motion';


export default function TabsComponent({coins}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: "var(--grey)",
    width: "50vw",
    fontSize: "1.2rem",
    fontFamily: "Inter",
    fontWeight: 600,
    textTransform: "capitalize",
    "&.Mui-selected" : {
      color: "var(--blue)" 
    },
    "& .MuiTabs-indicator": {
            backgroundColor: "var(--blue)",
    }
  };

  return (
    <div >
      <TabContext value={value}>
          <TabList onChange={handleChange} variant = "fullWidth">
            <Tab indicatorColor="var(--blue)" label="Grid" value="grid" sx = {style}/>
            <Tab indicatorColor="var(--blue)"  label="List" value="list"sx = {style} />
          </TabList>
        <TabPanel value="grid">
            <div className='grid-flex'>
                {coins.map((coin,i) =>{
                return (
                    <Grid coin = {coin} key = {i}/>
                ); 
            })}</div>
        </TabPanel>
        <TabPanel value="list">
            <table className='list-table'>
            {coins.map((item,i) =>{
                return (
                    <List coin = {item} key = {i}/>
                ); 
            })}

            </table>
            
        </TabPanel>
      </TabContext>
    </div>
  );
}
