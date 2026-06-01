/**
 * Helper to format backend error messages into clean, user-friendly messages.
 * Maps specific technical errors and formats any unrecognized errors.
 */
export const formatApiError = (error) => {
  if (!error) return 'An unexpected error occurred';

  let rawMessage = '';
  if (typeof error === 'string') {
    rawMessage = error;
  } else if (error.response?.data?.errors && typeof error.response.data.errors === 'object') {
    const validationErrors = error.response.data.errors;
    const firstField = Object.keys(validationErrors)[0];
    const firstError = validationErrors[firstField]?.[0] || '';
    if (firstError) {
      rawMessage = firstError;
    } else {
      rawMessage = error.response.data.message || error.message || 'An error occurred';
    }
  } else {
    rawMessage = error.response?.data?.message || error.message || 'An error occurred';
  }

  const msg = rawMessage.toLowerCase();

  // Mappings for specific technical errors
  if (msg.includes('client_id') || msg.includes('client id') || msg.includes('client is required') || msg.includes('select a client')) {
    return 'Please select a client';
  }
  if (msg.includes('deposit_type') || msg.includes('deposit type') || msg.includes('valid deposit type')) {
    return 'Please select a valid deposit type';
  }
  if (msg.includes('email') && (msg.includes('taken') || msg.includes('already registered') || msg.includes('already been taken'))) {
    return 'This email is already registered';
  }

  // Format unrecognized errors cleanly (replace underscores with spaces, capitalize first letter)
  const formatted = rawMessage.replace(/_/g, ' ').trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
