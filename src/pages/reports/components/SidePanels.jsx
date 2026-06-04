import React from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { Crown, Award, TrendingUp } from 'lucide-react';
import { useTopCustomers, useTopEmployees, useRevenueSummary, useRecentActivities } from '../data/reportsDummyData.jsx';

const cardSx = {
  p: '20px', borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff',
  transition: 'all 0.35s ease',
  '&:hover': { boxShadow: '0 12px 32px rgba(15,23,42,0.06)', borderColor: 'rgba(59,130,246,0.12)' },
};

const SectionHeader = ({ title, action }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
    <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>{title}</Typography>
    {action && (
      <Typography sx={{
        fontSize: 12, fontWeight: 600, color: '#2563eb', cursor: 'pointer',
        px: 1, py: 0.3, borderRadius: '6px',
        transition: 'all 0.2s',
        '&:hover': { color: '#1d4ed8', bgcolor: 'rgba(37,99,235,0.06)' },
      }}>
        View All
      </Typography>
    )}
  </Box>
);

const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32'];

const PanelSkeleton = ({ rows = 5 }) => (
  <Paper elevation={0} sx={cardSx}>
    <Skeleton width="40%" height={20} sx={{ mb: 2 }} />
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} width="100%" height={32} sx={{ mb: 1 }} />
    ))}
  </Paper>
);

export const TopCustomersPanel = () => {
  const { topCustomers, loading, error } = useTopCustomers();

  if (loading) return <PanelSkeleton />;
  if (error) return (
    <Paper elevation={0} sx={{ ...cardSx, border: '1px solid #fecaca', bgcolor: '#fef2f2' }}>
      <Typography sx={{ color: '#dc2626', fontSize: 13, fontWeight: 600, textAlign: 'center', py: 2 }}>Failed to load customers</Typography>
    </Paper>
  );

  return (
    <Paper elevation={0} sx={cardSx}>
      <SectionHeader title="Top Customers" action />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          display: 'grid', gridTemplateColumns: '24px 1fr 70px 90px', gap: 1,
          pb: 1, mb: 0.5, borderBottom: '1px solid #f1f5f9',
        }}>
          <Box />
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Customer</Typography>
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>Jobs</Typography>
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Revenue</Typography>
        </Box>
        {topCustomers.length === 0 ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>No customer data</Typography>
          </Box>
        ) : topCustomers.map((c, i) => (
          <Box key={i} sx={{
            display: 'grid', gridTemplateColumns: '24px 1fr 70px 90px', gap: 1, alignItems: 'center',
            py: 1.3, px: 0.5, borderRadius: '8px',
            transition: 'background 0.2s',
            '&:hover': { bgcolor: '#f8fafc' },
          }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: i < 3 ? `${rankColors[i]}12` : '#f1f5f9',
              fontSize: 11, fontWeight: 800, color: i < 3 ? rankColors[i] : '#94a3b8',
            }}>
              {i + 1}
            </Box>
            <Typography sx={{ fontSize: 13, color: '#1e293b', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</Typography>
            <Typography sx={{ fontSize: 13, color: '#475569', textAlign: 'center', fontWeight: 500 }}>{c.totalJobs}</Typography>
            <Typography sx={{ fontSize: 13, color: '#059669', fontWeight: 700, textAlign: 'right' }}>{c.revenue}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export const TopEmployeesPanel = () => {
  const { topEmployees, loading, error } = useTopEmployees();

  if (loading) return <PanelSkeleton />;
  if (error) return (
    <Paper elevation={0} sx={{ ...cardSx, border: '1px solid #fecaca', bgcolor: '#fef2f2' }}>
      <Typography sx={{ color: '#dc2626', fontSize: 13, fontWeight: 600, textAlign: 'center', py: 2 }}>Failed to load employees</Typography>
    </Paper>
  );

  return (
    <Paper elevation={0} sx={cardSx}>
      <SectionHeader title="Top Employees" action />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          display: 'grid', gridTemplateColumns: '24px 1fr 60px 90px', gap: 1,
          pb: 1, mb: 0.5, borderBottom: '1px solid #f1f5f9',
        }}>
          <Box />
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Employee</Typography>
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>Hours</Typography>
          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Completed</Typography>
        </Box>
        {topEmployees.length === 0 ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>No employee data</Typography>
          </Box>
        ) : topEmployees.map((e, i) => (
          <Box key={i} sx={{
            display: 'grid', gridTemplateColumns: '24px 1fr 60px 90px', gap: 1, alignItems: 'center',
            py: 1.3, px: 0.5, borderRadius: '8px',
            transition: 'background 0.2s',
            '&:hover': { bgcolor: '#f8fafc' },
          }}>
            <Box sx={{
              width: 22, height: 22, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: i < 3 ? `${rankColors[i]}12` : '#f1f5f9',
              fontSize: 11, fontWeight: 800, color: i < 3 ? rankColors[i] : '#94a3b8',
            }}>
              {i + 1}
            </Box>
            <Typography sx={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{e.name}</Typography>
            <Typography sx={{ fontSize: 13, color: '#475569', textAlign: 'center', fontWeight: 500 }}>{e.hours}</Typography>
            <Typography sx={{ fontSize: 13, color: '#2563eb', fontWeight: 700, textAlign: 'right' }}>{e.completedJobs}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export const RevenueSummaryPanel = () => {
  const { revenueSummary, loading, error } = useRevenueSummary();

  if (loading) return <PanelSkeleton rows={3} />;
  if (error) return (
    <Paper elevation={0} sx={{ ...cardSx, border: '1px solid #fecaca', bgcolor: '#fef2f2' }}>
      <Typography sx={{ color: '#dc2626', fontSize: 13, fontWeight: 600, textAlign: 'center', py: 2 }}>Failed to load revenue</Typography>
    </Paper>
  );

  return (
    <Paper elevation={0} sx={cardSx}>
      <SectionHeader title="Revenue Summary" />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 2.5 }}>
        {[
          { label: 'Total Revenue', value: revenueSummary.totalRevenue || '$0', growth: revenueSummary.revenueGrowth || '+0%', color: '#059669', bg: 'rgba(5,150,105,0.06)' },
          { label: 'Total Expenses', value: revenueSummary.totalExpenses || '$0', growth: revenueSummary.expenseGrowth || '+0%', color: '#d97706', bg: 'rgba(217,119,6,0.06)' },
          { label: 'Net Profit', value: revenueSummary.netProfit || '$0', growth: revenueSummary.profitGrowth || '+0%', color: '#2563eb', bg: 'rgba(37,99,235,0.06)' },
        ].map((item, i) => (
          <Box key={i} sx={{
            textAlign: 'center', p: 1.5, borderRadius: '12px', bgcolor: item.bg,
            transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' },
          }}>
            <Typography sx={{ fontSize: 10.5, color: '#94a3b8', fontWeight: 600, mb: 0.5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#0f172a', mb: 0.3, letterSpacing: '-0.02em' }}>{item.value}</Typography>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: 11, color: item.color, fontWeight: 600 }}>
              <TrendingUp size={10} strokeWidth={2.5} />{item.growth}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ height: 56, bgcolor: '#f8fafc', borderRadius: '10px', overflow: 'hidden' }}>
        <svg viewBox="0 0 300 50" width="100%" height="56" preserveAspectRatio="none">
          <defs>
            <linearGradient id="revSumGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 42 C 30 38, 50 30, 75 25 S 120 18, 150 15 S 200 12, 225 18 S 280 8, 300 5 L 300 50 L 0 50 Z" fill="url(#revSumGrad2)" />
          <path d="M 0 42 C 30 38, 50 30, 75 25 S 120 18, 150 15 S 200 12, 225 18 S 280 8, 300 5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Box>
    </Paper>
  );
};

export const RecentActivitiesPanel = () => {
  const { recentActivities, loading, error } = useRecentActivities();
  const typeConfig = {
    job: { color: '#2563eb', bg: 'rgba(37,99,235,0.1)' },
    invoice: { color: '#059669', bg: 'rgba(5,150,105,0.1)' },
    status: { color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    customer: { color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
    completed: { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  };

  if (loading) return <PanelSkeleton rows={5} />;
  if (error) return (
    <Paper elevation={0} sx={{ ...cardSx, border: '1px solid #fecaca', bgcolor: '#fef2f2' }}>
      <Typography sx={{ color: '#dc2626', fontSize: 13, fontWeight: 600, textAlign: 'center', py: 2 }}>Failed to load activities</Typography>
    </Paper>
  );

  return (
    <Paper elevation={0} sx={cardSx}>
      <SectionHeader title="Recent Activities" />
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', pl: 2 }}>
        {/* Timeline line */}
        <Box sx={{
          position: 'absolute', left: '5px', top: 8, bottom: 8,
          width: 1.5, bgcolor: '#f1f5f9', borderRadius: 1,
        }} />
        {recentActivities.length === 0 ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography sx={{ color: '#94a3b8', fontSize: 13 }}>No recent activities</Typography>
          </Box>
        ) : recentActivities.map((a, i) => {
          const cfg = typeConfig[a.type] || typeConfig.job;
          return (
            <Box key={i} sx={{
              display: 'flex', gap: 1.5, py: 1.5, position: 'relative',
            }}>
              {/* Timeline dot */}
              <Box sx={{
                position: 'absolute', left: '-13px', top: '18px',
                width: 10, height: 10, borderRadius: '50%',
                bgcolor: cfg.bg, border: `2px solid ${cfg.color}`,
                zIndex: 1,
              }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: 12.5, color: '#1e293b', lineHeight: 1.5, fontWeight: 500 }}>{a.text}</Typography>
                {a.by && <Typography sx={{ fontSize: 11, color: '#94a3b8', mt: 0.2 }}>by {a.by}</Typography>}
              </Box>
              <Box sx={{
                fontSize: 10.5, color: '#94a3b8', flexShrink: 0, whiteSpace: 'nowrap',
                bgcolor: '#f8fafc', px: 1, py: 0.3, borderRadius: '6px', fontWeight: 500,
                height: 'fit-content', mt: 0.3,
              }}>
                {a.time}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};
