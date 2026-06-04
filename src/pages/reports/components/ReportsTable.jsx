import React, { useState } from 'react';
import {
  Box, Typography, Paper, TextField, InputAdornment, FormControl,
  Select, MenuItem, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TablePagination, IconButton, Skeleton,
} from '@mui/material';
import { Search, MoreHorizontal, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRecentReports } from '../data/reportsDummyData.jsx';

const statusSx = {
  'Completed': { bg: 'rgba(5,150,105,0.08)', color: '#059669', border: 'rgba(5,150,105,0.15)', dot: '#10b981' },
  'In Progress': { bg: 'rgba(37,99,235,0.08)', color: '#2563eb', border: 'rgba(37,99,235,0.15)', dot: '#3b82f6' },
  'Pending': { bg: 'rgba(217,119,6,0.08)', color: '#d97706', border: 'rgba(217,119,6,0.15)', dot: '#f59e0b' },
  'Cancelled': { bg: 'rgba(220,38,38,0.08)', color: '#dc2626', border: 'rgba(220,38,38,0.15)', dot: '#ef4444' },
  'Scheduled': { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed', border: 'rgba(139,92,246,0.15)', dot: '#8b5cf6' },
};

const TableSkeleton = () => (
  <Paper elevation={0} sx={{ borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff', overflow: 'hidden' }}>
    <Box sx={{ p: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
      <Skeleton width="30%" height={24} sx={{ mb: 0.5 }} />
      <Skeleton width="20%" height={14} />
    </Box>
    <Box sx={{ p: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} width="100%" height={52} sx={{ mb: 0.5 }} />
      ))}
    </Box>
  </Paper>
);

const ReportsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const { recentReportsData, loading, error } = useRecentReports();

  if (loading) return <TableSkeleton />;
  if (error) {
    return (
      <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid #fecaca', bgcolor: '#fef2f2', textAlign: 'center' }}>
        <Typography sx={{ color: '#dc2626', fontSize: 13, fontWeight: 600 }}>Failed to load reports table</Typography>
      </Paper>
    );
  }

  const filtered = recentReportsData.filter(r => {
    if (search && !Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase()))) return false;
    if (typeFilter !== 'all' && r.serviceType.toLowerCase() !== typeFilter) return false;
    if (statusFilter !== 'all' && r.status.toLowerCase().replace(' ', '_') !== statusFilter) return false;
    return true;
  });

  const displayed = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const selectSx = {
    borderRadius: '10px', fontSize: 12, height: 36, color: '#475569',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf5' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6', borderWidth: 1.5 },
  };

  // Collect unique service types for dropdown
  const serviceTypes = [...new Set(recentReportsData.map(r => r.serviceType.toLowerCase()))];

  return (
    <Paper elevation={0} sx={{
      borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff', overflow: 'hidden',
      transition: 'all 0.35s ease',
      '&:hover': { boxShadow: '0 12px 32px rgba(15,23,42,0.06)' },
    }}>
      {/* Header */}
      <Box sx={{
        p: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: 1.5,
      }}>
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Recent Reports</Typography>
          <Typography sx={{ fontSize: 12, color: '#94a3b8', mt: 0.2 }}>
            Showing {filtered.length} total results
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            size="small" placeholder="Search reports..."
            value={search} onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Search size={15} color="#94a3b8" /></InputAdornment>,
            }}
            sx={{
              minWidth: 240,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px', fontSize: 13, height: 36, bgcolor: '#f8fafc',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e8edf5' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cbd5e1' },
                '&.Mui-focused': { bgcolor: '#fff' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6', borderWidth: 1.5 },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} sx={selectSx}>
              <MenuItem value="all">All Types</MenuItem>
              {serviceTypes.map(t => (
                <MenuItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={selectSx}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="scheduled">Scheduled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {['Job ID', 'Customer', 'Employee', 'Service Type', 'Amount', 'Status', 'Date', ''].map((h, i) => (
                <TableCell key={i} sx={{
                  color: '#64748b', fontWeight: 700, fontSize: 11, py: 1.5,
                  bgcolor: '#fafbfd', borderBottom: '2px solid #f1f5f9',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  ...(h === '' ? { width: 48 } : {}),
                }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayed.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ py: 8, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Search size={32} color="#cbd5e1" strokeWidth={1.5} />
                    <Typography sx={{ fontSize: 14, color: '#94a3b8', fontWeight: 500 }}>No reports found</Typography>
                    <Typography sx={{ fontSize: 12, color: '#cbd5e1' }}>Try adjusting your search or filters</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : displayed.map((r, i) => {
              const st = statusSx[r.status] || statusSx['Pending'];
              return (
                <TableRow key={i} sx={{
                  transition: 'background 0.2s ease',
                  bgcolor: i % 2 === 1 ? '#fafbfd' : '#fff',
                  '&:hover': { bgcolor: '#f0f4ff' },
                  '& td': { borderBottom: '1px solid #f3f4f8', py: 1.8 },
                }}>
                  <TableCell sx={{ fontWeight: 700, color: '#2563eb', fontSize: 13, fontFamily: '"SF Mono", monospace', letterSpacing: '-0.01em' }}>{r.jobId}</TableCell>
                  <TableCell sx={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{r.customer}</TableCell>
                  <TableCell sx={{ fontSize: 13, color: '#475569' }}>{r.employee}</TableCell>
                  <TableCell>
                    <Box sx={{
                      display: 'inline-block', fontSize: 12, color: '#475569', fontWeight: 500,
                      bgcolor: '#f1f5f9', px: 1, py: 0.3, borderRadius: '6px',
                    }}>
                      {r.serviceType}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{r.amount}</TableCell>
                  <TableCell>
                    <Box sx={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      bgcolor: st.bg, color: st.color, fontWeight: 700, fontSize: 11,
                      px: '10px', py: '4px', borderRadius: '8px',
                      border: `1px solid ${st.border}`,
                    }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: st.dot }} />
                      {r.status}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, color: '#64748b' }}>{r.date}</TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{
                      color: '#94a3b8', width: 30, height: 30,
                      '&:hover': { bgcolor: '#f1f5f9', color: '#475569' },
                    }}>
                      <MoreHorizontal size={16} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        px: 3, py: 1, borderTop: '1px solid #f1f5f9', bgcolor: '#fafbfd',
      }}>
        <Typography sx={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
          Showing {Math.min(page * rowsPerPage + 1, filtered.length)} to {Math.min((page + 1) * rowsPerPage, filtered.length)} of {filtered.length}
        </Typography>
        <TablePagination
          component="div" count={filtered.length} page={page}
          onPageChange={(e, p) => setPage(p)} rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          sx={{
            borderTop: 'none',
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': { fontSize: 12, color: '#64748b' },
          }}
        />
      </Box>
    </Paper>
  );
};

export default ReportsTable;
