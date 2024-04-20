import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import './App.css'
import DataTable from './DataTable';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const App = () => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const fetchHoldings = async () => {
    try {
      // send GET request
      const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
      setHoldings(response.data.payload);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching holdings:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>

      <div className='maintable'>
        <h1 style={{ color: 'black' }}>Holdings Table</h1>
        <DataTable data={holdings} />
      </div>

      <div className='footer'>
        <div>
          <GitHubIcon style={{ color: 'black' }} />
          <a href='https://github.com/navpreet032'>navpreet032</a>
        </div>

        <div>
          <LinkedInIcon style={{ color: 'black' }}></LinkedInIcon>
          <a href='https://www.linkedin.com/in/nav032/'>nav032</a>
        </div>
      </div>
    </div>
  );
};

export default App;
