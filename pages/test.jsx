import React, { useEffect, useState } from 'react';

const API_URL = 'https://openstat.psa.gov.ph:443/PXWeb/api/v1/en/DB/2M/NFG/0032M4AFN01.px';

const YourComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
  
          body: JSON.stringify({
            query: [
              {
                code: 'Geolocation',
                selection: {
                  filter: 'item',
                  values: ['000000000'],
                },
              },
              {
                code: 'Year',
                selection: {
                  filter: 'item',
                  values: ['12', '13'],
                },
              },
              {
                code: 'Period',
                selection: {
                  filter: 'item',
                  values: [
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                  ],
                },
              },
            ],
            response: {
              format: 'px',
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const responseData = await response.json();
        setData(responseData); // Assuming the response contains the data you need
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render the data here */}
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default YourComponent;
