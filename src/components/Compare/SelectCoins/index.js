import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { get100Coins } from '../../../functions/get100Coins';
import "./styles.css";

function SelectCoins({ crypto1, crypto2, handleCoinChange }) {
    const [allCoins, setAllCoins] = useState([]);

    const styles = {
        height: "2.5rem",
        color: "var(--white) !important",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white) !important",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "#3a80e9",
            },
        },
    };

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const myCoins = await get100Coins();
            if (Array.isArray(myCoins)) {
                setAllCoins(myCoins);
            } else {
                console.error("API did not return a valid array:", myCoins);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    }

    return (
        <div className="coins-flex">
            <p>Crypto 1:</p>
            <Select
                sx={styles}
                value={crypto1}
                label="Crypto 1"
                onChange={(event) => handleCoinChange(event, false)}
            >
                {allCoins && allCoins.length > 0 ? (
                    allCoins.filter((item) => item.id !== crypto2) 
                            .map((coin) => (
                        <MenuItem key={coin.id} value={coin.id}>
                            {coin.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                )}
            </Select>

            <p>Crypto 2:</p>
            <Select
                sx={styles}
                value={crypto2}
                label="Crypto 2"
                onChange={(event) => handleCoinChange(event, true)}
            >
                {allCoins && allCoins.length > 0 ? (
                    allCoins
                        .filter((item) => item.id !== crypto1 )
                        .map((coin) => (
                        <MenuItem key= {coin.id} value={coin.id}>
                            {coin.name}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                )}
            </Select>
        </div>
    );
}

export default SelectCoins;
