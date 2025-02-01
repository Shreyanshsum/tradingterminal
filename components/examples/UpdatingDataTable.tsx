'use client';

import * as React from 'react';
import DataTable from '@components/DataTable';

const UpdatingDataTable = (props) => {
  const [tableData, setTableData] = React.useState(props.data);
  const [error, setError] = React.useState<string | null>(null);

  const fetchStockData = async () => {
    try {
      const response = await fetch('/api/stocks');
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const { data } = await response.json();
      
      // Format data to match table structure
      const formattedData = [
        ['NAME', 'SYMBOL', 'PRICE', 'HOLDINGS'],
        ...data.map(stock => [
          stock.name,
          stock.symbol,
          stock.price,
          stock.holdings
        ])
      ];
      
      setTableData(formattedData);
      setError(null);
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('Failed to fetch stock data');
      // Use sample data as fallback
      setTableData(props.data);
    }
  };

  React.useEffect(() => {
    // Initial fetch
    fetchStockData();

    // Set up polling interval
    const interval = setInterval(fetchStockData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return <DataTable data={tableData} />;
};

export default UpdatingDataTable;
