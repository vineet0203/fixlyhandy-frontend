export const toCurrency = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

const round2 = (value) => Number(Number(value || 0).toFixed(2));

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
    finalAmount: toCurrency(round2(item.final_amount)),
  }));

  const totals = invoice?.totals || {};
  const billingAddress = invoice?.billing_address || {};

  const fallbackSubtotal = round2(items.reduce((sum, item) => sum + Number(item.amount || 0), 0));
  const fallbackMileage = round2(items.reduce((sum, item) => sum + Number(item.mileage || 0), 0));
  const fallbackOtherExpense = round2(items.reduce((sum, item) => sum + Number(item.other_expense || 0), 0));
  const fallbackGrandTotal = round2(items.reduce((sum, item) => sum + Number(item.final_amount || 0), 0));

  return {
    id: invoice?.id,
    invoiceNumber: invoice?.invoice_number || '-',
    customer: {
      name: invoice?.client?.name || 'Client',
      avatar: '',
      address: invoice?.client?.address || '-',
      contact: [invoice?.client?.phone, invoice?.client?.email].filter(Boolean).join(' | ') || '-',
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
      weeklyAmount: `${toCurrency(totals?.subtotal ?? fallbackSubtotal)}`,
      milage: toCurrency(totals?.mileage ?? fallbackMileage),
      otherExpense: toCurrency(totals?.other_expense ?? fallbackOtherExpense),
      total: `${toCurrency(totals?.grand_total ?? fallbackGrandTotal)}`,
    },
    rows,
    totals: {
      subtotal: toCurrency(totals?.subtotal ?? fallbackSubtotal),
      mileage: toCurrency(totals?.mileage ?? fallbackMileage),
      otherExpense: toCurrency(totals?.other_expense ?? fallbackOtherExpense),
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
    final_amount: amount,
  };
};
