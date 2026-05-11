import React from 'react';
import { Box, Typography, Paper, MenuItem, Select, FormControl, Skeleton } from '@mui/material';
import { useEmployeePerf } from '../data/reportsDummyData.jsx';

const barGradients = [
  'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)',
  'linear-gradient(90deg, #1e40af 0%, #3b82f6 60%, #93c5fd 100%)',
  'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
  'linear-gradient(90deg, #3b82f6 0%, #93c5fd 100%)',
  'linear-gradient(90deg, #60a5fa 0%, #bfdbfe 100%)',
];

const EmployeePerformanceChart = () => {
  const { employeePerformanceData, loading, error } = useEmployeePerf();

  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Skeleton width="60%" height={20} sx={{ mb: 2.5 }} />
        {[1, 2, 3, 4, 5].map(i => (
          <Box key={i} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
              <Skeleton width="30%" height={16} />
              <Skeleton width="10%" height={16} />
            </Box>
            <Skeleton variant="rounded" width="100%" height={22} sx={{ borderRadius: '6px' }} />
          </Box>
        ))}
      </Paper>
    );
  }

  if (error || !employeePerformanceData.length) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 1 }}>Employee Performance</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180 }}>
          <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>{error ? 'Failed to load' : 'No data available'}</Typography>
        </Box>
      </Paper>
    );
  }

  const maxVal = Math.max(...employeePerformanceData.map(d => d.completedJobs)) || 1;

  return (
    <Paper elevation={0} sx={{
      p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff',
      transition: 'all 0.35s ease',
      '&:hover': { boxShadow: '0 12px 32px rgba(15,23,42,0.06)', borderColor: 'rgba(59,130,246,0.15)' },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>Employee Performance</Typography>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select defaultValue="jobs" sx={{
            fontSize: 12, borderRadius: '10px', height: 32, color: '#64748b',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf5' },
          }}>
            <MenuItem value="jobs">By Jobs</MenuItem>
            <MenuItem value="hours">By Hours</MenuItem>
            <MenuItem value="revenue">By Revenue</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {employeePerformanceData.map((emp, i) => {
          const pct = (emp.completedJobs / maxVal) * 100;
          return (
            <Box key={i} sx={{
              transition: 'transform 0.2s', '&:hover': { transform: 'translateX(2px)' },
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography sx={{ fontSize: 13, color: '#1e293b', fontWeight: 600 }}>{emp.name}</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{emp.completedJobs}</Typography>
              </Box>
              <Box sx={{
                height: 22, bgcolor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden',
                position: 'relative',
              }}>
                <Box sx={{
                  height: '100%', width: `${pct}%`,
                  background: barGradients[i] || barGradients[0],
                  borderRadius: '6px',
                  transition: 'width 1s cubic-bezier(.25,.46,.45,.94)',
                  boxShadow: `0 2px 6px rgba(37,99,235,${0.15 + i * 0.03})`,
                }} />
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2.5 }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '3px', background: 'linear-gradient(90deg, #2563eb, #60a5fa)' }} />
        <Typography sx={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>Completed Jobs</Typography>
      </Box>
    </Paper>
  );
};

export default EmployeePerformanceChart;
