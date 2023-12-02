import { gql } from '@apollo/client';


//Just copy paste from apollo playground
export const GET_TOTAL_STATS = gql`
    query GetTotalStats($startDate: String, $endDate: String) {
        getTotalStats(startDate: $startDate, endDate: $endDate) {
            totalOrders
            totalSales
            totalProducts
        }
    }
 `;

export const GET_SALES_OR_ORDERS_STATS = gql`
    query GetSalesOrOrdersStats($showStatOf: String, $timeInterval: String) {
        getSalesOrOrdersStats(showStatOf: $showStatOf, timeInterval: $timeInterval) {
            _id {
            year
            week
            month
            day
            }
            totalValue
        }
    }
 `;

export const GET_TOP_PRODUCTS = gql`
    query GetTopProducts {
    getTopProducts {
        _id
        totalAmount
    }
    }
 `;

export const GET_TOP_BUYERS = gql`
query GetTopBuyers {
    getTopBuyers {
            _id
            totalExpense
        }
    }
`;




