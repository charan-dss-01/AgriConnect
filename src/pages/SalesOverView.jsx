import React, { useState, useEffect } from "react";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";

/* Register chart.js */
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
  },
};

const SalesOverview = () => {
  const [orders, setOrders] = useState([]);
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });
  const [productSalesData, setProductSalesData] = useState({
    labels: [],
    datasets: [],
  });
  const [orderStatusData, setOrderStatusData] = useState({
    labels: [],
    datasets: [],
  });

  const { profile } = useSelector((store) => store.auth);

  /* 🔒 FETCH LOGIC — UNTOUCHED */
  useEffect(() => {
    async function fetchOrders(farmerId) {
      const res = await axios.get(
        `${API_BASE_URL}/api/order/orderget/${farmerId}`,
      );
      setOrders(res.data.orders);
    }

    if (!profile) return;
    const farmerId = profile?._id || profile?.user?._id;
    if (!farmerId) return;

    fetchOrders(farmerId);
  }, [profile]);

  /* 🔒 DATA LOGIC — UNTOUCHED */
  useEffect(() => {
    if (!orders.length) return;

    const dailySales = {};
    const productSales = {};
    const orderStatuses = { Pending: 0, Delivered: 0 };

    orders.forEach((o) => {
      const date = new Date(o.createdAt).toLocaleDateString();
      dailySales[date] = (dailySales[date] || 0) + o.totalAmount;

      o.items.forEach((i) => {
        if (!i.product) return;
        productSales[i.product.title] =
          (productSales[i.product.title] || 0) + i.product.price * i.quantity;
      });

      if (orderStatuses[o.status] !== undefined) {
        orderStatuses[o.status]++;
      }
    });

    setSalesData({
      labels: Object.keys(dailySales),
      datasets: [
        {
          label: "Daily Revenue",
          data: Object.values(dailySales),
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.25)",
          tension: 0.4,
          fill: true,
        },
      ],
    });

    setProductSalesData({
      labels: Object.keys(productSales),
      datasets: [
        {
          label: "Sales by Product",
          data: Object.values(productSales),
          backgroundColor: "#60a5fa",
        },
      ],
    });

    setOrderStatusData({
      labels: Object.keys(orderStatuses),
      datasets: [
        {
          data: Object.values(orderStatuses),
          backgroundColor: ["#22c55e", "#fb7185"],
        },
      ],
    });
  }, [orders]);

  /* UI-ONLY DERIVED DATA */
  const ordersPerDayData = {
    labels: salesData.labels,
    datasets: [
      {
        label: "Orders per Day",
        data: salesData.labels.map(
          (d) =>
            orders.filter(
              (o) => new Date(o.createdAt).toLocaleDateString() === d,
            ).length,
        ),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
        🌾 Farm Sales Dashboard
      </h1>

      {/* RESPONSIVE DASHBOARD GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-2">
        {/* 1 */}
        <DashboardCard title="📈 Daily Revenue Trend">
          <Line data={salesData} options={chartOptions} />
        </DashboardCard>

        {/* 2 */}
        <DashboardCard title="✅ Order Completion Ratio">
          <Doughnut data={orderStatusData} options={chartOptions} />
        </DashboardCard>

        {/* 3 */}
        <DashboardCard title="🛒 Orders per Day">
          <Bar data={ordersPerDayData} options={chartOptions} />
        </DashboardCard>

        {/* 4 */}
        <DashboardCard title="🏆 Top Selling Products">
          <Bar data={productSalesData} options={chartOptions} />
        </DashboardCard>

        {/* 5 */}
        <DashboardCard title="🥧 Product Revenue Share">
          <Pie data={productSalesData} options={chartOptions} />
        </DashboardCard>

        {/* 6 */}
        <DashboardCard title="💰 Revenue vs Order Trend">
          <Line
            options={chartOptions}
            data={{
              labels: salesData.labels,
              datasets: [
                {
                  label: "Revenue",
                  data: salesData.datasets[0]?.data || [],
                  borderColor: "#22c55e",
                  backgroundColor: "rgba(34,197,94,0.2)",
                  tension: 0.4,
                },
                {
                  label: "Orders",
                  data: ordersPerDayData.datasets[0].data,
                  borderColor: "#6366f1",
                  backgroundColor: "rgba(99,102,241,0.2)",
                  tension: 0.4,
                },
              ],
            }}
          />
        </DashboardCard>
      </div>
    </div>
  );
};

/* 🔹 MODERN DASHBOARD CARD */
const DashboardCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col h-[340px]">
    <h3 className="text-sm font-semibold text-gray-600 mb-2">{title}</h3>
    <div className="flex-1 relative">{children}</div>
  </div>
);

export default SalesOverview;
