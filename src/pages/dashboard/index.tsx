import React from "react";
import Grid from "@mui/material/Grid";
import { Paper, Typography, Box } from "@mui/material";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales ($)",
      data: [12000, 19000, 15000, 22000, 18000, 25000],
      borderColor: "#1976d2",
      backgroundColor: "rgba(25, 118, 210, 0.2)",
      fill: true,
    },
  ],
};

const productData = {
  labels: ["Electronics", "Clothing", "Books", "Home", "Toys"],
  datasets: [
    {
      label: "Units Sold",
      data: [300, 500, 200, 400, 250],
      backgroundColor: [
        "#1976d2",
        "#ff9800",
        "#4caf50",
        "#f44336",
        "#9c27b0",
      ],
    },
  ],
};

const orderStatusData = {
  labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
  datasets: [
    {
      data: [150, 300, 450, 100],
      backgroundColor: ["#ff9800", "#4caf50", "#1976d2", "#f44336"],
    },
  ],
};

const revenueData = {
  labels: ["Electronics", "Clothing", "Books", "Home"],
  datasets: [
    {
      data: [50000, 30000, 15000, 25000],
      backgroundColor: ["#1976d2", "#ff9800", "#4caf50", "#f44336"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" as const },
  },
};

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        TenzorSoft Dashboard
      </Typography>

      <Grid container spacing={3}>
    
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Sales Overview</Typography>
            <Box sx={{ height: "80%" }}>
              <Line data={salesData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid  xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Product Sales</Typography>
            <Box sx={{ height: "80%" }}>
              <Bar data={productData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Order Status</Typography>
            <Box sx={{ height: "80%" }}>
              <Pie data={orderStatusData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Revenue by Category</Typography>
            <Box sx={{ height: "80%" }}>
              <Doughnut data={revenueData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
