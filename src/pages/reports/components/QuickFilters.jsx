import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CalendarDays } from 'lucide-react';
import { quickFilterOptions } from '../data/reportsDummyData.jsx';

const QuickFilters = ({ activeFilter, setActiveFilter, filters }) => {
  const { customerFilter, setCustomerFilter, employeeFilter, setEmployeeFilter,
    jobStatusFilter, setJobStatusFilter, paymentFilter, setPaymentFilter,
    serviceFilter, setServiceFilter } = filters;

  return (
    <Box sx={{
      p: '18px 22px', mb: 3, borderRadius: '16px',
      border: '1px solid rgba(226,232,240,0.8)', bgcolor: '#fff',
      boxShadow: '0 1px 3px rgba(15,23,42,0.03)',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2.5 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>Quick Filters</Typography>

        {/* Segmented control */}
        <Box sx={{
          display: 'inline-flex', bgcolor: '#f1f5f9', borderRadius: '10px', p: '3px',
          border: '1px solid #e8edf5',
        }}>
          {quickFilterOptions.map(opt => {
            const isActive = activeFilter === opt;
            return (
              <Button
                key={opt} size="small"
                onClick={() => setActiveFilter(opt)}
                startIcon={opt === 'Custom' ? <CalendarDays size={12} /> : undefined}
                sx={{
                  textTransform: 'none', fontSize: 12, fontWeight: 600,
                  px: 2, py: 0.5, borderRadius: '8px', minWidth: 0,
                  color: isActive ? '#fff' : '#64748b',
                  bgcolor: isActive ? '#2563eb' : 'transparent',
                  boxShadow: isActive ? '0 2px 8px rgba(37,99,235,0.3)' : 'none',
                  '&:hover': { bgcolor: isActive ? '#1d4ed8' : 'rgba(0,0,0,0.04)' },
                  transition: 'all 0.25s cubic-bezier(.25,.46,.45,.94)',
                }}
              >
                {opt}
              </Button>
            );
          })}
        </Box>

        {/* Filter dropdowns */}
        <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto', flexWrap: 'wrap' }}>
          {[
            { label: 'Customer', value: customerFilter, set: setCustomerFilter, options: ['All Customers', 'ABC Corp', 'XYZ Services', 'PQR Solutions'] },
            { label: 'Employee', value: employeeFilter, set: setEmployeeFilter, options: ['All Employees', 'Ajinkya', 'Sagar', 'Rohit'] },
            { label: 'Job Status', value: jobStatusFilter, set: setJobStatusFilter, options: ['All Status', 'Completed', 'In Progress', 'Pending', 'Cancelled'] },
            { label: 'Payment Status', value: paymentFilter, set: setPaymentFilter, options: ['All Status', 'Paid', 'Unpaid', 'Overdue'] },
            { label: 'Service Type', value: serviceFilter, set: setServiceFilter, options: ['All Services', 'Installation', 'Maintenance', 'Repair'] },
          ].map((f, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
              <Typography sx={{
                fontSize: 10, fontWeight: 700, color: '#94a3b8',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {f.label}
              </Typography>
              <select
                value={f.value}
                onChange={e => f.set(e.target.value)}
                style={{
                  height: 34, borderRadius: 10, border: '1px solid #e8edf5',
                  fontSize: 12, color: '#475569', padding: '0 12px 0 10px',
                  background: '#fafbfd', cursor: 'pointer', outline: 'none',
                  fontFamily: 'Poppins, sans-serif', minWidth: 130,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  appearance: 'auto',
                }}
                onFocus={e => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = '#e8edf5'; e.target.style.boxShadow = 'none'; }}
              >
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Box>
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined"
            onClick={() => {
              setCustomerFilter('All Customers'); setEmployeeFilter('All Employees');
              setJobStatusFilter('All Status'); setPaymentFilter('All Status');
              setServiceFilter('All Services'); setActiveFilter('Monthly');
            }}
            sx={{
              textTransform: 'none', fontSize: 12, fontWeight: 600,
              borderRadius: '10px', borderColor: '#e2e8f0', color: '#64748b', height: 34,
              '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' },
            }}
          >
            Reset
          </Button>
          <Button size="small" variant="contained"
            sx={{
              textTransform: 'none', fontSize: 12, fontWeight: 700,
              borderRadius: '10px', bgcolor: '#2563eb', height: 34,
              boxShadow: '0 2px 8px rgba(37,99,235,0.25)',
              '&:hover': { bgcolor: '#1d4ed8', boxShadow: '0 4px 12px rgba(37,99,235,0.35)' },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuickFilters;
