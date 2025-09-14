import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
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
} from 'chart.js';
import { useTranslation } from 'react-i18next'; // i18next hook

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

const Dashboard: React.FC = () => {
  const { t } = useTranslation(); // Tarjima uchun hook

  // Grafik ma'lumotlari
  const salesData = {
    labels: [
      t('january'),
      t('february'),
      t('march'),
      t('april'),
      t('may'),
      t('june'),
    ],
    datasets: [
      {
        label: t('salesLabel'),
        data: [12000, 19000, 15000, 22000, 18000, 25000],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        fill: true,
      },
    ],
  };

  const productData = {
    labels: [
      t('electronics'),
      t('clothing'),
      t('books'),
      t('homeCategory'),
      t('toys'),
    ],
    datasets: [
      {
        label: t('unitsSold'),
        data: [300, 500, 200, 400, 250],
        backgroundColor: [
          '#1976d2',
          '#ff9800',
          '#4caf50',
          '#f44336',
          '#9c27b0',
        ],
      },
    ],
  };

  const orderStatusData = {
    labels: [
      t('pending'),
      t('shipped'),
      t('delivered'),
      t('cancelled'),
    ],
    datasets: [
      {
        data: [150, 300, 450, 100],
        backgroundColor: ['#ff9800', '#4caf50', '#1976d2', '#f44336'],
      },
    ],
  };

  const revenueData = {
    labels: [
      t('electronics'),
      t('clothing'),
      t('books'),
      t('homeCategory'),
    ],
    datasets: [
      {
        data: [50000, 30000, 15000, 25000],
        backgroundColor: ['#1976d2', '#ff9800', '#4caf50', '#f44336'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('tenzorsoftDashboard')} {/* Tarjima */}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          '& > *': {
            flex: {
              xs: '1 1 100%', // Full width on mobile (<600px)
              sm: '1 1 calc(50% - 12px)', // Two columns on tablet (600px–960px)
              md: '1 1 calc(50% - 12px)', // Two columns on desktop (≥960px)
            },
            minWidth: 0, // Prevent overflow on small screens
          },
        }}
      >
        <Paper sx={{ p: 2, height: { xs: 250, sm: 300 }, width: '100%' }}>
          <Typography variant="h6">{t('salesOverview')}</Typography>
          <Box sx={{ height: '80%' }}>
            <Line data={salesData} options={chartOptions} />
          </Box>
        </Paper>

        <Paper sx={{ p: 2, height: { xs: 250, sm: 300 }, width: '100%' }}>
          <Typography variant="h6">{t('productSales')}</Typography>
          <Box sx={{ height: '80%' }}>
            <Bar data={productData} options={chartOptions} />
          </Box>
        </Paper>

        <Paper sx={{ p: 2, height: { xs: 250, sm: 300 }, width: '100%' }}>
          <Typography variant="h6">{t('orderStatus')}</Typography>
          <Box sx={{ height: '80%' }}>
            <Pie data={orderStatusData} options={chartOptions} />
          </Box>
        </Paper>

        <Paper sx={{ p: 2, height: { xs: 250, sm: 300 }, width: '100%' }}>
          <Typography variant="h6">{t('revenueByCategory')}</Typography>
          <Box sx={{ height: '80%' }}>
            <Doughnut data={revenueData} options={chartOptions} />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
