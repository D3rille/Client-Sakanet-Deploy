import React from 'react';
import { Bar } from 'react-chartjs-2';

import Chart from 'chart.js/auto'

const TopProductsStats = ({data}) => {
    let chartLabels = data.map(stat => stat._id);
    let dataValues = data.map(stat=>stat.totalAmount);
    const input = {
        labels: chartLabels,
        datasets: [
        {
            label: 'Total Sales',
            backgroundColor: 'rgba(24, 111, 101, 0.4)', // Bar color
            borderColor: 'rgba(75,192,192,1)', // Border color
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(24, 111, 101, 0.6)', // Hover color
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: dataValues, // Replace with your data
        },
        ],
    };

    const options = {
        indexAxis:"y",
        scales: {
        x: {
            beginAtZero: true,
            title:{
                display:true,
                text:"Amount"
            } 
            },
        y: {
            title: {
            display: true,
            text: 'Products',
            },
            },
        },
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Top Products Based on Sales'
            }
        },
    };

    return (<Bar data={input} options={options} />);
};

export default TopProductsStats;
