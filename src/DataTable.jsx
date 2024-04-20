import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import './App.css'
const StyledTableCell = styled(TableCell)(({ theme, value }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgba(218, 218, 218, 0.2)',
        color: theme.palette.common.white,
        width: '100%',
        height: '2vh'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        width: '100%',
        height: '2vh',
        // if value < 0 then text color = red else gray
        color: value < 0 ? theme.palette.error.main : 'gray',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(218, 218, 218, 0.2)',
        width: '100vw'
    },

    '&:last-child td, &:last-child th': {
        border: 0,
        width: '100vw'
    },
}));



const Container = styled(TableContainer)({
    maxHeight: 500,
    width: '80vw',
});

const DataTable = ({ data }) => {
    const holdings = data;
    const [expandedGroups, setExpandedGroups] = useState([]);



    const handleExpandGroup = (assetClass) => {
        if (expandedGroups.includes(assetClass)) {
            setExpandedGroups(expandedGroups.filter((group) => group !== assetClass));
        } else {
            setExpandedGroups([...expandedGroups, assetClass]);
        }
    };
// ? USED to group the Holdings in a key-value pair EX: { asset_class: 'Stocks', ...... }
    const renderHoldingsTable = () => {
        const groupedHoldings = holdings.reduce((acc, holding) => {
            const { asset_class } = holding;
            if (!acc[asset_class]) {
                acc[asset_class] = [];
            }
            acc[asset_class].push(holding);
            return acc;
        }, {});
         console.log(groupedHoldings)

        // assetClass is KEY , holdings is VALUE which is stored in groupedHoldings
        // Object.entries(groupedHoldings) returns the key value pair and pass it to map via array destructuring
        return Object.entries(groupedHoldings).map(([assetClass, holdings]) => (
            <React.Fragment key={assetClass}>
                {console.log(assetClass,holdings)}
                <StyledTableRow>
                    <StyledTableCell colSpan={7}>
                        <Box display="flex" alignItems="center">
                            <IconButton size="small" onClick={() => handleExpandGroup(assetClass)} style={{ backgroundColor: '#5e50f0' }}>
                                {/* if array expandedGroups has current assetClass then render KeyboardArrowUpIcon else KeyboardArrowDownIcon*/}
                                {expandedGroups.includes(assetClass) ? (
                                    <KeyboardArrowUpIcon style={{ color: 'white' }} />
                                ) : (
                                    <KeyboardArrowDownIcon style={{ color: 'white' }} />
                                )}
                            </IconButton>
                            <Box ml={1} display="flex" alignItems="center">
                                {assetClass}
                                <p> ({holdings.length})</p>
                            </Box>
                        </Box>
                    </StyledTableCell>
                </StyledTableRow>
                {expandedGroups.includes(assetClass) && (
                    <React.Fragment>
                        {/* DIV `nestedtbales` is used to show the holdings belonging to the same asset_class together  */}
                        <div className='nestedtables'>
                            <StyledTableRow>
                                <StyledTableCell><b>NAME OF THE HOLDING</b></StyledTableCell>
                                <StyledTableCell ><b>TICKER</b></StyledTableCell>
                                <StyledTableCell><b>Asset Class</b></StyledTableCell>
                                <StyledTableCell><b>Average Price</b></StyledTableCell>
                                <StyledTableCell><b>Market Price</b></StyledTableCell>
                                <StyledTableCell><b>Latest Change %</b></StyledTableCell>
                                <StyledTableCell><b>Market Value (Base CCY)</b></StyledTableCell>
                            </StyledTableRow>

                            {holdings.map((holding) => (
                                <StyledTableRow key={holding.id}>
                                    <StyledTableCell>{holding.name || ''}</StyledTableCell>
                                    <StyledTableCell>{holding.ticker || ''}</StyledTableCell>
                                    <StyledTableCell>{holding.asset_class || ''}</StyledTableCell>

                                    <StyledTableCell >
                                        {(holding.avg_price || 0)}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {(holding.market_price || 0).toFixed(3)}
                                    </StyledTableCell>

                                    {/* !if value < 0 then text color = red else gray */}
                                    <StyledTableCell value={(holding.latest_chg_pct || 0)}>
                                        {(holding.latest_chg_pct || 0)}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {(holding.market_value_ccy || 0).toFixed(2)}
                                    </StyledTableCell>
                                </StyledTableRow>

                            ))}
                        </div>
                    </React.Fragment>
                )}
            </React.Fragment>
        ));
    };

    return (
        <Container>
            <TableContainer component={Paper} sx={{
                backgroundColor: "#ffffff",
                fontSize: "1.1rem",
            }} >
                <TableBody>{renderHoldingsTable()}</TableBody>
            </TableContainer>
        </Container>
    );
};

export default DataTable;