import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Briefcase, DollarSign, FileText, CheckCircle,
  Users, Clock, TrendingUp, BarChart3, TrendingDown
} from 'lucide-react';
import { useKpiCards } from '../data/reportsDummyData.jsx';

const iconMap = {
  briefcase: Briefcase, dollar: DollarSign, invoice: FileText,
  check: CheckCircle, users: Users, clock: Clock,
  trending: TrendingUp, chart: BarChart3,
};

// Mini sparkline data per card
const sparklines = {
  totalJobs: [30, 45, 35, 60, 50, 72, 65, 80],
  totalRevenue: [20, 35, 28, 50, 42, 55, 62, 78],
  pendingInvoices: [40, 32, 48, 38, 55, 45, 58, 52],
  completedJobs: [25, 38, 42, 55, 48, 65, 58, 72],
  activeCustomers: [35, 42, 38, 52, 48, 60, 55, 68],
  employeeHours: [28, 40, 35, 52, 45, 58, 62, 70],
  profitMargin: [45, 42, 50, 48, 55, 52, 60, 58],
  monthlyGrowth: [20, 30, 25, 42, 38, 52, 48, 65],
};

const MiniSparkline = ({ data, color }) => {
  const max = Math.max(...data);
  const w = 80, h = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (v / max) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  const areaPath = `M0,${h} L${points.split(' ').map((p, i) => {
    const [x, y] = p.split(',');
    return `${x},${y}`;
  }).join(' L')} L${w},${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#spark-${color.replace('#', '')})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const AnimatedValue = ({ value }) => {
  const [display, setDisplay] = useState(value);
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    setDisplay(value);
  }, [value]);
  return <>{display}</>;
};

const KpiCard = ({ card, index }) => {
  const Icon = iconMap[card.icon] || Briefcase;
  const sparks = sparklines[card.id] || sparklines.totalJobs;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Paper
        elevation={0}
        sx={{
          p: '20px', borderRadius: '14px',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          bgcolor: '#fff', position: 'relative', overflow: 'hidden',
          transition: 'all 0.35s cubic-bezier(.25,.46,.45,.94)',
          cursor: 'default',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: `0 16px 40px ${card.color}14, 0 4px 12px rgba(0,0,0,0.04)`,
            borderColor: `${card.color}30`,
            '& .kpi-icon-box': {
              transform: 'scale(1.08)',
              boxShadow: `0 6px 16px ${card.color}25`,
            },
          },
        }}
      >
        {/* Decorative gradient orb */}
        <Box sx={{
          position: 'absolute', top: -30, right: -30, width: 90, height: 90,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${card.color}0a 0%, transparent 70%)`,
        }} />

        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
          <Box className="kpi-icon-box" sx={{
            width: 44, height: 44, borderRadius: '12px',
            background: `linear-gradient(135deg, ${card.bg} 0%, ${card.color}12 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.35s ease',
            boxShadow: `0 2px 8px ${card.color}15`,
          }}>
            <Icon size={20} color={card.color} strokeWidth={2.2} />
          </Box>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            bgcolor: card.positive ? 'rgba(5, 150, 105, 0.08)' : 'rgba(220, 38, 38, 0.08)',
            color: card.positive ? '#059669' : '#dc2626',
            px: '8px', py: '3px', borderRadius: '8px', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.01em',
          }}>
            {card.positive ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
            {card.growth}
          </Box>
        </Box>

        <Typography sx={{
          fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1.1, mb: 0.3,
          letterSpacing: '-0.02em',
        }}>
          <AnimatedValue value={card.value} />
        </Typography>
        <Typography sx={{
          fontSize: 11.5, fontWeight: 600, color: '#64748b',
          textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1,
        }}>
          {card.label}
        </Typography>

        {/* Sparkline */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 10.5, color: '#94a3b8', lineHeight: 1 }}>
            {card.period}
          </Typography>
          <MiniSparkline data={sparks} color={card.color} />
        </Box>
      </Paper>
    </motion.div>
  );
};

const KpiSkeleton = () => (
  <Box sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)', xl: 'repeat(8, 1fr)' },
    gap: 2, mb: 3.5,
  }}>
    {Array.from({ length: 8 }).map((_, i) => (
      <Paper key={i} elevation={0} sx={{ p: '20px', borderRadius: '14px', border: '1px solid rgba(226,232,240,0.8)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: '12px' }} />
          <Skeleton variant="rounded" width={60} height={22} sx={{ borderRadius: '8px' }} />
        </Box>
        <Skeleton width="60%" height={32} sx={{ mb: 0.5 }} />
        <Skeleton width="80%" height={14} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton width="40%" height={12} />
          <Skeleton variant="rounded" width={80} height={28} />
        </Box>
      </Paper>
    ))}
  </Box>
);

const ReportsKpiCards = () => {
  const { kpiCards, loading, error } = useKpiCards();

  if (loading) return <KpiSkeleton />;
  if (error) return (
    <Paper elevation={0} sx={{ p: 3, mb: 3.5, borderRadius: '14px', border: '1px solid #fecaca', bgcolor: '#fef2f2', textAlign: 'center' }}>
      <Typography sx={{ color: '#dc2626', fontSize: 13, fontWeight: 600 }}>{error}</Typography>
    </Paper>
  );
  if (!kpiCards.length) return null;

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)', xl: 'repeat(8, 1fr)' },
      gap: 2, mb: 3.5,
    }}>
      {kpiCards.map((card, i) => <KpiCard key={card.id} card={card} index={i} />)}
    </Box>
  );
};

export default ReportsKpiCards;
