export const toCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

const round2 = (value) => Number(Number(value || 0).toFixed(2));

const calculateVatValue = (amount, vatPercent) => round2((Number(amount || 0) * Number(vatPercent || 0)) / 100);

export const mapInvoiceApiToPreviewData = (invoice) => {
  const employee = invoice?.employee || {};
  const items = invoice?.items || [];

  const rows = (invoice?.items || []).map((item, index) => ({
    no: index + 1,
    jobId: item.job_id ? `#${item.job_id}` : '-',
    jobName: item.job_name || '-',
    mileage: toCurrency(item.mileage),
    otherExpense: toCurrency(item.other_expense),
    amount: toCurrency(item.amount),
    vat: toCurrency(calculateVatValue(item.amount, item.vat)),
    finalAmount: toCurrency(round2(item.final_amount)),
  }));

  const totals = invoice?.totals || {};
  const billingAddress = invoice?.billing_address || {};

  const fallbackSubtotal = round2(items.reduce((sum, item) => sum + Number(item.amount || 0), 0));
  const fallbackMileage = round2(items.reduce((sum, item) => sum + Number(item.mileage || 0), 0));
  const fallbackOtherExpense = round2(items.reduce((sum, item) => sum + Number(item.other_expense || 0), 0));
  const fallbackVatValue = round2(items.reduce((sum, item) => sum + calculateVatValue(item.amount, item.vat), 0));
  const fallbackGrandTotal = round2(items.reduce((sum, item) => sum + Number(item.final_amount || 0), 0));

  return {
    id: invoice?.id,
    invoiceNumber: invoice?.invoice_number || '-',
    customer: {
      name: employee?.full_name || `${employee?.first_name || ''} ${employee?.last_name || ''}`.trim() || 'Employee',
      avatar: employee?.profile_photo || '',
      address: employee?.address || '-',
      contact: [employee?.mobile_number, employee?.email].filter(Boolean).join(' | ') || '-',
    },
    totalAmount: Number(totals?.grand_total ?? fallbackGrandTotal).toFixed(2),
    billDate: invoice?.bill_date || '-',
    deliveryDate: invoice?.delivery_date || '-',
    paymentDeadline: invoice?.payment_deadline || '-',
    mileage: toCurrency(invoice?.mileage),
    billingAddress: {
      name: billingAddress?.name || '-',
      street: billingAddress?.street || '-',
      contact: billingAddress?.contact || '-',
    },
    note: invoice?.note || '-',
    terms: invoice?.terms_conditions || '-',
    summary: {
      weeklyAmount: `${toCurrency(totals?.subtotal ?? fallbackSubtotal)} Incl. VAT`,
      milage: toCurrency(totals?.mileage ?? fallbackMileage),
      otherExpense: toCurrency(totals?.other_expense ?? fallbackOtherExpense),
      total: `${toCurrency(totals?.grand_total ?? fallbackGrandTotal)} Incl. VAT`,
    },
    rows,
    totals: {
      subtotal: toCurrency(totals?.subtotal ?? fallbackSubtotal),
      mileage: toCurrency(totals?.mileage ?? fallbackMileage),
      otherExpense: toCurrency(totals?.other_expense ?? fallbackOtherExpense),
      vat: toCurrency(totals?.vat_total ?? fallbackVatValue),
      total: toCurrency(totals?.grand_total ?? fallbackGrandTotal),
    },
  };
};

export const mapJobToInvoiceRow = (job) => {
  const amount = Number(job?.total_amount || 0);
  return {
    job_id: job?.id,
    job_name: job?.title || '-',
    mileage: 0,
    other_expense: 0,
    amount,
    vat: 0,
    final_amount: amount,
  };
};
