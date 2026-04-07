import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import invoiceService from './services/invoiceService';
import { mapInvoiceApiToPreviewData } from './utils/invoiceMappers';
import html2pdf from 'html2pdf.js';

const InvoicePDFView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceId = location.state?.invoiceId || location.state?.invoiceData?.id;
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const invoiceCardRef = useRef(null);

  const invoiceData = useMemo(() => (invoice ? mapInvoiceApiToPreviewData(invoice) : null), [invoice]);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!invoiceId) {
        navigate('/invoices');
        return;
      }
      try {
        setLoading(true);
        const data = await invoiceService.getById(invoiceId);
        setInvoice(data);
      } catch (error) {
        setInvoice(null);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [invoiceId, navigate]);

  if (loading) {
    return (
      <Box className="invoice-pdf-page">
        <Typography sx={{ p: 3 }}>Loading invoice PDF...</Typography>
      </Box>
    );
  }

  if (!invoiceData) return null;

  const {
    invoiceNumber,
    customer,
    billDate,
    paymentDeadline,
    mileage,
    billingAddress,
    terms,
    totals,
  } = invoiceData;

  const invoiceRows = invoiceData.rows || [];

  const handleDownloadPdf = async () => {
    if (!invoiceCardRef.current) return;
    setIsExporting(true);

    // Force fixed width for clean PDF capture
    const card = invoiceCardRef.current;
    const originalStyle = card.getAttribute('style') || '';
    card.style.width = '750px';
    card.style.maxWidth = '750px';
    card.style.padding = '32px';
    card.style.boxShadow = 'none';
    card.style.borderRadius = '0';

    await new Promise((resolve) => requestAnimationFrame(resolve));

    try {
      await html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: `Invoice-${invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollX: 0,
          scrollY: 0,
          width: 750,
          windowWidth: 750,
          backgroundColor: '#ffffff',
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      }).from(card).save();
    } finally {
      card.setAttribute('style', originalStyle);
      setIsExporting(false);
    }
  };

  // Inline styles for PDF card — no CSS classes that can be overridden
  const cardStyle = {
    background: '#fff',
    borderRadius: '8px',
    padding: '40px',
    maxWidth: '860px',
    width: '100%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Poppins', sans-serif",
  };

  const thStyle = {
    background: '#f9fafb',
    padding: '10px 8px',
    textAlign: 'left',
    fontSize: '11px',
    fontWeight: '700',
    color: '#6b7280',
    borderBottom: '2px solid #e5e7eb',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    verticalAlign: 'middle',
    lineHeight: '1.2',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  };

  const tdStyle = {
    padding: '12px 8px',
    textAlign: 'left',
    fontSize: '12px',
    color: '#1f2937',
    borderBottom: '1px solid #e5e7eb',
    verticalAlign: 'middle',
    lineHeight: '1.3',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
  };

  const colWidths = ['5%', '10%', '24%', '10%', '13%', '13%', '8%', '17%'];

  return (
    <Box className="invoice-pdf-page">
      {/* Toolbar */}
      <Box className="invoice-pdf-toolbar">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          className="invoice-pdf-back-btn"
        >
          Back to Preview
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="invoice-pdf-print-btn"
        >
          {isExporting ? 'Generating...' : 'Print / Save as PDF'}
        </Button>
      </Box>

      {/* Invoice Card */}
      <Box className="invoice-pdf-container">
        <Box ref={invoiceCardRef} style={cardStyle}>

          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
            <div>
              <div style={{ display: 'inline-block', background: '#2e74d0', color: '#fff', padding: '7px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '16px', marginBottom: '14px' }}>
                TRAKJOBS
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', marginBottom: '4px' }}>{customer.name}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{customer.address}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>{customer.contact}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#2e74d0', marginBottom: '12px' }}>INVOICE</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>Invoice :</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{invoiceNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>Date:</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{billDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>Due Date:</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{paymentDeadline}</span>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>Bill To:</div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937' }}>{billingAddress.name}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>{billingAddress.street}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>{billingAddress.contact}</div>
          </div>

          {/* Table */}
          <div style={{ width: '100%', marginBottom: '28px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                {colWidths.map((w, i) => <col key={i} style={{ width: w }} />)}
              </colgroup>
              <thead>
                <tr>
                  <th style={{ ...thStyle, textAlign: 'center' }}>NO</th>
                  <th style={thStyle}>JOB ID</th>
                  <th style={thStyle}>JOB NAME</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>MILEAGE</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>OTHER EXP</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>AMOUNT</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>VAT</th>
                  <th style={{ ...thStyle, textAlign: 'right' }}>FINAL AMT</th>
                </tr>
              </thead>
              <tbody>
                {invoiceRows.map((row, index) => (
                  <tr key={`${row.jobId}-${index}`} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>{row.no}</td>
                    <td style={tdStyle}>{row.jobId}</td>
                    <td style={tdStyle}>{row.jobName}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{row.mileage}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{row.otherExpense}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{row.amount}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>{row.vat}</td>
                    <td style={{ ...tdStyle, textAlign: 'right', borderBottom: index === invoiceRows.length - 1 ? '2px solid #e5e7eb' : '1px solid #e5e7eb' }}>{row.finalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', marginBottom: '24px' }}>
            {[
              { label: 'Subtotal:', value: totals.subtotal },
              { label: 'Mileage:', value: totals.mileage },
              { label: 'Other Expense:', value: totals.otherExpense },
              { label: 'Vat', value: totals.vat },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '48px', width: '280px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', minWidth: '90px', textAlign: 'right' }}>{item.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '48px', width: '280px', paddingTop: '10px', borderTop: '2px solid #e5e7eb' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937', flex: 1 }}>Total:</span>
              <span style={{ fontSize: '15px', fontWeight: '700', color: '#1f2937', minWidth: '90px', textAlign: 'right' }}>{totals.total}</span>
            </div>
          </div>

          {/* Terms */}
          {terms && (
            <div style={{ paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6' }}>{terms}</div>
            </div>
          )}

        </Box>
      </Box>
    </Box>
  );
};

export default InvoicePDFView;