import React from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import { useJobStatusData } from '../data/reportsDummyData.jsx';

const JobStatusChart = () => {
  const { jobStatusData, loading, error } = useJobStatusData();

  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Skeleton width="40%" height={20} sx={{ mb: 2.5 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Skeleton variant="circular" width={200} height={200} />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[1, 2, 3, 4].map(i => <Skeleton key={i} width="100%" height={24} />)}
          </Box>
        </Box>
      </Paper>
    );
  }

  if (error || !jobStatusData.length) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 1 }}>Jobs Status</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180 }}>
          <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>{error ? 'Failed to load' : 'No data available'}</Typography>
        </Box>
      </Paper>
    );
  }

  const total = jobStatusData.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const radius = 68;
  const stroke = 20;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <Paper elevation={0} sx={{
      p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff',
      transition: 'all 0.35s ease',
      '&:hover': { boxShadow: '0 12px 32px rgba(15,23,42,0.06)', borderColor: 'rgba(59,130,246,0.15)' },
    }}>
      <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 2.5, letterSpacing: '-0.01em' }}>Jobs Status</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{ position: 'relative', width: 200, height: 200, flexShrink: 0 }}>
          <svg viewBox="0 0 200 200" width="100%">
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f8fafc" strokeWidth={stroke} />
            {jobStatusData.map((seg, i) => {
              const pct = seg.value / total;
              const dashLen = pct * circumference - 3;
              const dashOff = -(cumulative / total) * circumference;
              cumulative += seg.value;
              return (
                <circle
                  key={i} cx={cx} cy={cy} r={radius}
                  fill="none" stroke={seg.color}
                  strokeWidth={stroke} strokeLinecap="round"
                  strokeDasharray={`${Math.max(dashLen, 0)} ${circumference}`}
                  strokeDashoffset={dashOff}
                  transform={`rotate(-90 ${cx} ${cy})`}
                  style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(.25,.46,.45,.94)' }}
                />
              );
            })}
            <text x={cx} y={cy - 8} textAnchor="middle" fill="#0f172a" fontSize="30" fontWeight="800" fontFamily="Poppins" letterSpacing="-1">{total}</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="500" fontFamily="Poppins">Total Jobs</text>
          </svg>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {jobStatusData.map((seg, i) => (
            <Box key={i} sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              p: '6px 8px', borderRadius: '8px',
              transition: 'background 0.2s',
              '&:hover': { bgcolor: '#f8fafc' },
            }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: seg.color, flexShrink: 0 }} />
              <Typography sx={{ fontSize: 13, color: '#475569', flex: 1, fontWeight: 500 }}>{seg.label}</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a', minWidth: 28, textAlign: 'right' }}>{seg.value}</Typography>
              <Typography sx={{ fontSize: 11, color: '#94a3b8', minWidth: 45, textAlign: 'right' }}>({seg.percent})</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default JobStatusChart;
