import React from 'react';
import { Box, Typography, Paper, MenuItem, Select, FormControl, Skeleton } from '@mui/material';
import { TrendingUp } from 'lucide-react';
import { useRevenueData } from '../data/reportsDummyData.jsx';

const chartH = 220;
const chartW = 420;
const padL = 52;
const padB = 34;
const padT = 24;
const padR = 24;
const plotW = chartW - padL - padR;
const plotH = chartH - padT - padB;

// Smooth cubic bezier curve
const smoothPath = (points) => {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
};

const RevenueChart = () => {
  const { revenueData, loading, error } = useRevenueData();

  if (loading) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Skeleton width="40%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton width="30%" height={32} sx={{ mb: 2 }} />
        <Skeleton variant="rounded" width="100%" height={180} sx={{ borderRadius: '10px' }} />
      </Paper>
    );
  }

  if (error || !revenueData.length) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff' }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 1 }}>Revenue Overview</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180 }}>
          <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>{error ? 'Failed to load' : 'No data available'}</Typography>
        </Box>
      </Paper>
    );
  }

  const maxVal = Math.max(...revenueData.map(d => d.value)) * 1.15 || 1;

  const getPoint = (i, val) => ({
    x: padL + (i / (revenueData.length - 1)) * plotW,
    y: padT + plotH - (val / maxVal) * plotH,
  });

  const pts = revenueData.map((d, i) => getPoint(i, d.value));
  const pathD = smoothPath(pts);
  const areaD = pathD + ` L ${pts[pts.length - 1].x} ${padT + plotH} L ${pts[0].x} ${padT + plotH} Z`;

  // Dynamic y ticks
  const tickStep = Math.ceil(maxVal / 4 / 1000) * 1000;
  const yTicks = [0, tickStep, tickStep * 2, tickStep * 3].filter(t => t <= maxVal * 1.1);

  const totalRevenue = revenueData.reduce((s, d) => s + d.value, 0);
  const lastMonth = revenueData.length >= 2 ? revenueData[revenueData.length - 1].value : 0;
  const prevMonth = revenueData.length >= 2 ? revenueData[revenueData.length - 2].value : 0;
  const growthPct = prevMonth > 0 ? (((lastMonth - prevMonth) / prevMonth) * 100).toFixed(1) : '0.0';

  return (
    <Paper elevation={0} sx={{
      p: 3, borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff',
      transition: 'all 0.35s ease',
      '&:hover': { boxShadow: '0 12px 32px rgba(15,23,42,0.06)', borderColor: 'rgba(59,130,246,0.15)' },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Box>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', mb: 0.3 }}>Revenue Overview</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              ${(lastMonth / 1000).toFixed(1)}K
            </Typography>
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: '2px',
              bgcolor: 'rgba(5,150,105,0.08)', color: '#059669',
              px: '6px', py: '2px', borderRadius: '6px', fontSize: 11, fontWeight: 700,
            }}>
              <TrendingUp size={10} strokeWidth={2.5} />{growthPct >= 0 ? '+' : ''}{growthPct}%
            </Box>
          </Box>
        </Box>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <Select defaultValue="monthly" sx={{
            fontSize: 12, borderRadius: '10px', height: 32, color: '#64748b',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf5' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
          }}>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 2 }}>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="revGradPrem" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {yTicks.map(t => {
            const y = padT + plotH - (t / maxVal) * plotH;
            return (
              <g key={t}>
                <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4,4" />
                <text x={padL - 10} y={y + 3.5} textAnchor="end" fill="#b0b8c9" fontSize="9" fontFamily="Poppins" fontWeight="500">
                  ${(t / 1000).toFixed(0)}K
                </text>
              </g>
            );
          })}
          <path d={areaD} fill="url(#revGradPrem)" />
          <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          {revenueData.map((d, i) => {
            const { x, y } = getPoint(i, d.value);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="#fff" stroke="#3b82f6" strokeWidth="2.5" style={{ transition: 'r 0.2s' }} />
                <circle cx={x} cy={y} r="2" fill="#3b82f6" />
                <text x={x} y={padT + plotH + 20} textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Poppins" fontWeight="500">
                  {d.month}
                </text>
              </g>
            );
          })}
          {(() => {
            const last = revenueData[revenueData.length - 1];
            const { x, y } = getPoint(revenueData.length - 1, last.value);
            return (
              <g>
                <rect x={x - 34} y={y - 30} width="68" height="22" rx="6" fill="#1e40af" />
                <polygon points={`${x - 4},${y - 8} ${x + 4},${y - 8} ${x},${y - 3}`} fill="#1e40af" />
                <text x={x} y={y - 16} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="Poppins">
                  ${(last.value / 1000).toFixed(1)}K
                </text>
              </g>
            );
          })()}
        </svg>
      </Box>
    </Paper>
  );
};

export default RevenueChart;
