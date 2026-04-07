import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, ButtonGroup, FormControl, MenuItem, Paper, Popover, Select, Stack, TextField, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PageHeader from '../../components/common/PageHeader';
import CrewList from '../../components/invoice/CrewList';
import JobCard from '../../components/invoice/JobCard';
import InvoicePreview from './InvoicePreview';
import employeeService from '../../features/employees/services/employeeService';
import jobService from '../../features/jobs/services/jobService';
import invoiceService from './services/invoiceService';
import { mapJobToInvoiceRow } from './utils/invoiceMappers';
import { useToast } from '../../components/common/ToastProvider';

const toIsoDate = (date) => {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  return parsed.toISOString().split('T')[0];
};

const addDays = (dateString, days) => {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return '';
  parsed.setDate(parsed.getDate() + days);
  return parsed.toISOString().split('T')[0];
};

const InvoiceList = () => {
  const { showToast } = useToast();
  const [crewMembers, setCrewMembers] = useState([]);
  const [selectedCrewId, setSelectedCrewId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('all');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('all');
  const [selectedView, setSelectedView] = useState('month');
  const [viewAnchorEl, setViewAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 6));
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [creatingInvoice, setCreatingInvoice] = useState(false);
  const [previewInvoiceId, setPreviewInvoiceId] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeService.getAll({ per_page: 100, page: 1 });
        const data = Array.isArray(response?.data) ? response.data : [];
        const mapped = data.map((employee) => ({
          id: employee.id,
          name: employee.full_name || `${employee.first_name || ''} ${employee.last_name || ''}`.trim() || `Employee ${employee.id}`,
          avatar: employee.profile_photo || '',
          team: employee.department || 'all',
        }));

        setCrewMembers(mapped);

        if (mapped.length > 0) {
          setSelectedCrewId(mapped[0].id);
        }
      } catch (error) {
        showToast('Failed to load employees for invoice generation.', 'error');
      }
    };

    fetchEmployees();
  }, [showToast]);

  useEffect(() => {
    const fetchJobsForEmployee = async () => {
      if (!selectedCrewId) {
        setJobs([]);
        return;
      }

      try {
        const response = await jobService.getAll({ per_page: 100, page: 1 });
        const data = Array.isArray(response?.data) ? response.data : [];
        const filtered = data.filter((job) => {
          const latestEmployeeId = Number(job?.latest_assignment?.employee_id || 0);
          return latestEmployeeId === Number(selectedCrewId);
        });
        setJobs(filtered);
      } catch (error) {
        showToast('Failed to load jobs for selected employee.', 'error');
        setJobs([]);
      }
    };

    fetchJobsForEmployee();
  }, [selectedCrewId, showToast]);

  const jobCards = useMemo(() => {
    const viewLabel = selectedView.charAt(0).toUpperCase() + selectedView.slice(1);

    return jobs.map((job) => ({
      id: job.id,
      jobId: job.job_number ? `#${job.job_number}` : `#${job.id}`,
      jobName: job.title || '-',
      date: job.start_date || job.issue_date || '-',
      viewType: viewLabel,
      rate: Number(job.total_amount || 0),
    }));
  }, [jobs, selectedView]);

  const handleGenerateInvoice = async () => {
    if (!selectedCrewId) {
      showToast('Please select an employee before generating invoice.', 'error');
      return;
    }

    if (jobs.length === 0) {
      showToast('No assigned jobs found for selected employee.', 'error');
      return;
    }

    const billDate = selectedView === 'month' ? toIsoDate(selectedDate) : (fromDate || toIsoDate(new Date()));
    const deliveryDate = toDate || billDate;
    const paymentDeadline = addDays(deliveryDate || billDate, 15);
    const billingClient = jobs[0]?.client || {};

    const payload = {
      employee_id: selectedCrewId,
      bill_date: billDate,
      delivery_date: deliveryDate,
      payment_deadline: paymentDeadline,
      mileage: 0,
      other_expense: 0,
      vat: 0,
      note: '',
      terms_conditions: '',
      billing_address: {
        name: billingClient.name || '-',
        street: '-',
        contact: [billingClient.contact_phone, billingClient.contact_email].filter(Boolean).join(' | ') || '-',
      },
      status: 'draft',
      items: jobs.map(mapJobToInvoiceRow),
    };

    try {
      setCreatingInvoice(true);
      const created = await invoiceService.create(payload);
      setPreviewInvoiceId(created.id);
      showToast('Invoice generated successfully.', 'success');
    } catch (error) {
      showToast(error?.response?.data?.message || 'Failed to generate invoice.', 'error');
    } finally {
      setCreatingInvoice(false);
    }
  };

  if (previewInvoiceId) {
    return (
      <InvoicePreview
        onBackToList={() => setPreviewInvoiceId(null)}
        invoiceId={previewInvoiceId}
      />
    );
  }

  const isViewDropdownOpen = Boolean(viewAnchorEl);

  const handleViewClick = (view, event) => {
    setSelectedView(view);
    setViewAnchorEl(event.currentTarget);
  };

  const handleCloseViewDropdown = () => {
    setViewAnchorEl(null);
  };

  return (
    <Box sx={{ height: 'auto' }}>
      <PageHeader
        breadcrumb={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Invoices', current: true },
        ]}
        title="Invoices"
      />

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #d8dde6',
          p: { xs: 1.25, md: 2 },
          backgroundColor: '#f9f9fa',
          height: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr auto' },
            gap: 1.25,
            mb: 1.25,
            alignItems: 'end',
          }}
        >
          <FormControl fullWidth>
            <Typography sx={{ fontSize: 12, color: '#7a8190', ml: 0.75, mb: 0.25 }}>Employees</Typography>
            <Select
              value={selectedEmployeeFilter}
              onChange={(event) => {
                const value = event.target.value;
                setSelectedEmployeeFilter(value);
                if (value !== 'all') {
                  setSelectedCrewId(Number(value));
                }
              }}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                height: 44,
                borderRadius: 1.5,
                bgcolor: '#fff',
                fontSize: 14,
                color: '#2e3442',
              }}
            >
              <MenuItem value="all">All Employees</MenuItem>
              {crewMembers.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Typography sx={{ fontSize: 12, color: '#7a8190', ml: 0.75, mb: 0.25 }}>Teams</Typography>
            <Select
              value={selectedTeamFilter}
              onChange={(event) => setSelectedTeamFilter(event.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                height: 44,
                borderRadius: 1.5,
                bgcolor: '#fff',
                fontSize: 14,
                color: '#2e3442',
              }}
            >
              <MenuItem value="all">All Teams</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              justifySelf: { xs: 'start', md: 'end' },
              display: 'inline-flex',
            }}
          >
            <ButtonGroup variant="outlined" aria-label="invoice view selection">
              {['month', 'week', 'day'].map((view) => (
                <Button
                  key={view}
                  variant={selectedView === view ? 'contained' : 'outlined'}
                  onClick={(event) => handleViewClick(view, event)}
                  sx={{ textTransform: 'none', minWidth: 84 }}
                >
                  {view}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>

        <Popover
          open={isViewDropdownOpen}
          anchorEl={viewAnchorEl}
          onClose={handleCloseViewDropdown}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                p: 2,
                width: selectedView === 'month' ? 320 : 360,
              },
            },
          }}
        >
          {selectedView === 'month' ? (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
            </LocalizationProvider>
          ) : (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <TextField
                label="From"
                type="date"
                value={fromDate}
                onChange={(event) => setFromDate(event.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="To"
                type="date"
                value={toDate}
                onChange={(event) => setToDate(event.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>
          )}
        </Popover>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 2.6fr' },
            gap: 1,
            alignItems: 'start',
            height: 'auto',
          }}
        >
          <CrewList
            crewMembers={crewMembers}
            selectedCrewId={selectedCrewId}
            onSelect={setSelectedCrewId}
          />

          <Paper
            elevation={0}
            sx={{
              border: '1px solid #3f79c7',
              borderRadius: 2,
              p: 1.25,
              height: 'auto',
              position: 'relative',
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#3b3b3b', pb: 1, borderBottom: '1px solid #e8e8e8', lineHeight: 1 }}>
              Job Details
            </Typography>

            <Box sx={{ mt: 1, position: 'relative' }}>
              <Box sx={{ position: 'absolute', left: 16, top: 20, bottom: 26, width: 2, bgcolor: '#2f73d2', opacity: 0.7 }} />
              {jobCards.map((job) => (
                <JobCard key={job.id} job={job} selectedView={selectedView} />
              ))}
            </Box>

            {selectedView === 'month' && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 1, mt: -0.5 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#2c2f39' }}>
                  Job Rate: ${jobs.length > 0 ? (jobs.reduce((sum, job) => sum + Number(job.total_amount || 0), 0) / jobs.length).toFixed(2) : '0.00'}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.25, pr: 0.5, pb: 0.25 }}>
              <Button
                variant="contained"
                onClick={handleGenerateInvoice}
                startIcon={<DescriptionOutlinedIcon />}
                disabled={creatingInvoice}
                sx={{
                  bgcolor: '#2f73d2',
                  '&:hover': { bgcolor: '#2f73d2' },
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  px: 2.25,
                  height: 42,
                }}
              >
                {creatingInvoice ? 'Generating...' : 'Generate Invoice'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Box>
  );
};

export default InvoiceList;