import React from 'react';
import { Box, Typography, Paper, MenuItem, Select, FormControl, Skeleton } from '@mui/material';
import { useInvoiceAnalytics } from '../data/reportsDummyData.jsx';

const barW = 14;

const InvoiceAnalyticsChart = () => {
  const { invoiceAnalyticsData, loading, error } = useInvoiceAnalytics();
  const chartH = 180;

  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Skeleton width="50%" height={20} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2.5, mb: 2 }}>
          {[1, 2, 3].map(i => <Skeleton key={i} width={60} height={14} />)}
        </Box>
        <Skeleton variant="rounded" width="100%" height={160} sx={{ borderRadius: '10px' }} />
      </Paper>
    );
  }

  if (error || !invoiceAnalyticsData.length) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 1 }}>Invoice Analytics</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180 }}>
          <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>{error ? 'Failed to load' : 'No data available'}</Typography>
        </Box>
      </Paper>
    );
  }

  const maxVal = Math.max(...invoiceAnalyticsData.map(d => d.paid + d.unpaid + d.overdue)) * 1.1 || 1;

  return (
    <Paper elevation={0} sx={{
      p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff',
      transition: 'all 0.35s ease',
      '&:hover': { boxShadow: '0 12px 32px rgba(15,23,42,0.06)', borderColor: 'rgba(59,130,246,0.15)' },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>Invoice Analytics</Typography>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select defaultValue="monthly" sx={{
            fontSize: 12, borderRadius: '10px', height: 32, color: '#64748b',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf5' },
          }}>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 2.5, mb: 2 }}>
        {[
          { label: 'Paid', color: '#10b981' },
          { label: 'Unpaid', color: '#f59e0b' },
          { label: 'Overdue', color: '#ef4444' },
        ].map((l, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: l.color }} />
            <Typography sx={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{l.label}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
        height: chartH, pt: 1,
      }}>
        {invoiceAnalyticsData.map((d, i) => {
          const paidH = (d.paid / maxVal) * (chartH - 30);
          const unpaidH = (d.unpaid / maxVal) * (chartH - 30);
          const overdueH = (d.overdue / maxVal) * (chartH - 30);
          return (
            <Box key={i} sx={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.8,
              transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' },
            }}>
              <Box sx={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
                <Box sx={{
                  width: barW, height: Math.max(paidH, 2), borderRadius: '4px 4px 1px 1px',
                  background: 'linear-gradient(180deg, #10b981 0%, #34d399 100%)',
                  transition: 'height 0.8s cubic-bezier(.25,.46,.45,.94)',
                  boxShadow: '0 2px 4px rgba(16,185,129,0.2)',
                }} />
                <Box sx={{
                  width: barW, height: Math.max(unpaidH, 2), borderRadius: '4px 4px 1px 1px',
                  background: 'linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%)',
                  transition: 'height 0.8s cubic-bezier(.25,.46,.45,.94)',
                  boxShadow: '0 2px 4px rgba(245,158,11,0.2)',
                }} />
                <Box sx={{
                  width: barW, height: Math.max(overdueH, 2), borderRadius: '4px 4px 1px 1px',
                  background: 'linear-gradient(180deg, #ef4444 0%, #f87171 100%)',
                  transition: 'height 0.8s cubic-bezier(.25,.46,.45,.94)',
                  boxShadow: '0 2px 4px rgba(239,68,68,0.2)',
                }} />
              </Box>
              <Typography sx={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}>{d.month}</Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default InvoiceAnalyticsChart;
