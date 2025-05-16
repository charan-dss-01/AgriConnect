import React, { useState, useEffect } from 'react'; 
import { Bar, Pie } from 'react-chartjs-2'; 
import axios from 'axios'; 
import { useAuth } from '../context/AuthProvider'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { API_BASE_URL } from '../config';
// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // For Pie chart
);

const SalesOverview = () => {
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [productSalesData, setProductSalesData] = useState({ labels: [], datasets: [] });
  const [orderStatusData, setOrderStatusData] = useState({ labels: [], datasets: [] });
  const { profile } = useAuth();

  useEffect(() => {
    async function fetchOrders(farmerId) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/order/orders/get/${farmerId}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    if (profile) {
      fetchOrders(profile?._id || profile?.user?._id);
    }
  }, [profile]);

  useEffect(() => {
    if (orders.length > 0) {
      // Aggregate daily sales data
      const dailySales = {};
      const productSales = {};
      const orderStatuses = { Pending: 0, Delivered: 0 };

      orders.forEach((order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        if (!dailySales[date]) dailySales[date] = 0;
        dailySales[date] += order.totalAmount;

        order.items.forEach((item) => {
          if (!productSales[item.product.title]) productSales[item.product.title] = 0;
          productSales[item.product.title] += item.product.price * item.quantity;
        });

        orderStatuses[order.status] += 1;
      });

      // Prepare sales data for charts
      const dailyLabels = Object.keys(dailySales);
      const dailyData = Object.values(dailySales);
      setSalesData({
        labels: dailyLabels,
        datasets: [
          {
            label: 'Sales Amount by Date',
            data: dailyData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      const productLabels = Object.keys(productSales);
      const productData = Object.values(productSales);
      setProductSalesData({
        labels: productLabels,
        datasets: [
          {
            label: 'Sales by Product',
            data: productData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      });

      const statusLabels = Object.keys(orderStatuses);
      const statusData = Object.values(orderStatuses);
      setOrderStatusData({
        labels: statusLabels,
        datasets: [
          {
            label: 'Order Status Distribution',
            data: statusData,
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
          },
        ],
      });
    }
  }, [orders]);

  // Pie chart options to control height and aspect ratio
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
                  <h1 className="text-4xl font-bold mb-6 text-center text-orange-500 bg-clip-text drop-shadow-lg animate__animated animate__fadeInDown">
                Sales Overview
            </h1>
      
      {/* First row: Two charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Total Sales by Date</h3>
          <Bar data={salesData} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 ">Sales Breakdown by Product</h3>
          <Bar data={productSalesData} />
        </div>
      </div>

      {/* Second row: Pie chart for order status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden" style={{ height: '400px' }}>
          <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
          <Pie className="p-8" data={orderStatusData} options={pieChartOptions} />
        </div>

        {/* <div className="bg-white shadow-md rounded-lg p-4 overflow-hidden" style={{ height: '400px' }}>
          <h3 className="text-lg font-semibold mb-4">Additional Chart (Optional)</h3>

        </div> */}
      </div>
    </div>
  );
};

export default SalesOverview;
