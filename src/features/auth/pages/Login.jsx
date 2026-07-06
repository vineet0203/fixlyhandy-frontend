// features/auth/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import AuthLayout from '../components/ui/AuthLayout';
import DebouncedTextField from '../../../components/common/form/DebouncedTextField';
import PasswordField from '../../../components/common/form/PasswordField';
import { loginSchema } from '../schemas/validationSchemas';
import { useAuth } from '../hooks/useAuth';
import ErrorDialog from '../../../components/common/ErrorDialog';
import { useDispatch } from 'react-redux';
import { loadFromStorage } from '../../../store/slices/authSlice';
import httpClient from '../../../services/api/httpClient';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roles = ['Customer', 'Employee', 'Vendor'];
  const { 
    login, 
    loading, 
    error, 
    validationErrors, 
    lastErrorCode,
    clearError 
  } = useAuth();
  
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [currentError, setCurrentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [snackbarOpen, setSnackbarOpen] = useState(!!location.state?.message);
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();

  // WhatsApp Login States
  const [showWhatsappLogin, setShowWhatsappLogin] = useState(false);
  const [showWhatsappOtp, setShowWhatsappOtp] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappOtp, setWhatsappOtp] = useState(['', '', '', '', '', '']);
  const [whatsappDebugOtp, setWhatsappDebugOtp] = useState('');
  const [socialError, setSocialError] = useState('');

  // Handle success message from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setSnackbarOpen(true);
      // Clear the state to prevent showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      if (lastErrorCode === 422) {
        // Validation errors - show snackbar
        setSnackbarOpen(true);
      } else {
        // Other errors - show dialog
        setCurrentError({
          response: {
            data: {
              message: error,
              code: lastErrorCode,
              errors: validationErrors
            }
          }
        });
        setErrorDialogOpen(true);
      }
    }
  }, [error, lastErrorCode, validationErrors]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const role = values.role;
      const result = await login(values, role === 'Vendor' ? '/dashboard' : null);
      
      if (result) {
        if (role === 'Customer') {
          const customerAppUrl = import.meta.env.VITE_CUSTOMER_APP_URL || 'http://localhost:5175';
          const token = result?.data?.access_token;
          if (token) {
            const separator = customerAppUrl.includes('?') ? '&' : '?';
            window.location.href = `${customerAppUrl}${separator}authToken=${encodeURIComponent(token)}`;
          } else {
            window.location.href = customerAppUrl;
          }
        } else if (role === 'Employee') {
          const employeeAppUrl = import.meta.env.VITE_EMPLOYEE_APP_URL || 'http://localhost:5174';
          const token = result?.data?.access_token;
          if (token) {
            const separator = employeeAppUrl.includes('?') ? '&' : '?';
            window.location.href = `${employeeAppUrl}${separator}authToken=${encodeURIComponent(token)}`;
          } else {
            window.location.href = employeeAppUrl;
          }
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (err) {
      console.error('Login error in component:', err);
      
      // Handle validation errors (422)
      if (err.code === 422 || err.status === 422) {
        // Set field errors from validation response
        const fieldErrors = err.errors || validationErrors;
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          setFieldError(field, Array.isArray(messages) ? messages[0] : messages);
        });
      } else {
        // For all other errors, the useEffect will handle showing dialog
        setCurrentError(err);
        setErrorDialogOpen(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleErrorAction = (action) => {
    if (action === 'reset-password') {
      navigate('/auth/forgot-password');
    } else if (action === 'contact-support') {
      window.location.href = 'mailto:support@example.com';
    } else if (action === 'retry') {
      setErrorDialogOpen(false);
      clearError();
    }
  };

  const handleSocialLoginSuccess = (token, user) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(loadFromStorage());

    const role = selectedRole;
    if (role === 'Customer') {
      const customerAppUrl = import.meta.env.VITE_CUSTOMER_APP_URL || 'http://localhost:5175';
      const separator = customerAppUrl.includes('?') ? '&' : '?';
      window.location.href = `${customerAppUrl}${separator}authToken=${encodeURIComponent(token)}`;
    } else if (role === 'Employee') {
      const employeeAppUrl = import.meta.env.VITE_EMPLOYEE_APP_URL || 'http://localhost:5174';
      const separator = employeeAppUrl.includes('?') ? '&' : '?';
      window.location.href = `${employeeAppUrl}${separator}authToken=${encodeURIComponent(token)}`;
    } else {
      // Vendor / Standard User
      if (!user?.is_verified) {
        navigate('/verify', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  };

  const handleGoogleLogin = async () => {
    setSocialError('');
    const mockEmail = window.prompt(
      'Enter Google email or token to login (e.g. mock_vendor@gmail.com for simulated mode):',
      'mock_vendor@gmail.com'
    );
    if (!mockEmail) return;

    try {
      const tokenVal = mockEmail.includes('@') && !mockEmail.startsWith('mock_')
        ? `mock_${mockEmail}`
        : mockEmail;

      const response = await httpClient.post('/api/v1/auth/login/google', {
        id_token: tokenVal,
        type: selectedRole === 'Customer' ? 'customer' : 'user',
      });

      if (response.data.success) {
        const data = response.data.data;
        const token = data.access_token || data.token;
        const userObj = data.user || data.customer;
        handleSocialLoginSuccess(token, userObj);
      }
    } catch (error) {
      setSocialError(error?.response?.data?.message || 'Google login failed.');
    }
  };

  const handleWhatsappSendOtp = async (event) => {
    event.preventDefault();
    setSocialError('');
    if (!whatsappNumber.trim()) {
      setSocialError('Please enter a WhatsApp number.');
      return;
    }

    try {
      const response = await httpClient.post('/api/v1/auth/login/whatsapp', {
        whatsapp_number: whatsappNumber.trim(),
        type: selectedRole === 'Customer' ? 'customer' : 'user',
      });

      if (response.data.success) {
        setShowWhatsappOtp(true);
        if (response.data.data?.otp) {
          setWhatsappDebugOtp(response.data.data.otp);
        }
      }
    } catch (error) {
      setSocialError(error?.response?.data?.message || 'Failed to send OTP.');
    }
  };

  const handleOtpChange = (index, value) => {
    if (/[^0-9]/.test(value) && value !== '') return;
    const newOtp = [...whatsappOtp];
    newOtp[index] = value.substring(value.length - 1);
    setWhatsappOtp(newOtp);

    // Shift focus
    if (value && index < 5) {
      const nextInput = document.getElementById(`vendor-login-otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !whatsappOtp[index] && index > 0) {
      const prevInput = document.getElementById(`vendor-login-otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleWhatsappVerifyOtp = async (event) => {
    event.preventDefault();
    setSocialError('');
    const otpValue = whatsappOtp.join('');
    if (otpValue.length < 6) {
      setSocialError('Please enter the full 6-digit OTP code.');
      return;
    }

    try {
      const response = await httpClient.post('/api/v1/auth/login/whatsapp', {
        whatsapp_number: whatsappNumber.trim(),
        otp: otpValue,
        type: selectedRole === 'Customer' ? 'customer' : 'user',
      });

      if (response.data.success) {
        const data = response.data.data;
        const token = data.access_token || data.token;
        const userObj = data.user || data.customer;
        handleSocialLoginSuccess(token, userObj);
      }
    } catch (error) {
      setSocialError(error?.response?.data?.message || 'WhatsApp login verification failed.');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    clearError();
  };

  const handleSelectRole = (role) => {
    if (role === 'Employee') {
      const employeeAppUrl = import.meta.env.VITE_EMPLOYEE_APP_URL || 'http://localhost:5174';
      window.location.href = `${employeeAppUrl}/login`;
      return;
    }
    if (role === 'Customer') {
      const customerAppUrl = import.meta.env.VITE_CUSTOMER_APP_URL || 'http://localhost:5175';
      window.location.href = `${customerAppUrl}/login`;
      return;
    }
    setSelectedRole(role);
    clearError();
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole('');
    clearError();
  };

  return (
    <AuthLayout title={selectedRole ? `LOGIN as ${selectedRole}` : 'LOGIN'}>
      {/* Error Dialog for non-validation errors */}
      <ErrorDialog
        open={errorDialogOpen}
        onClose={() => {
          setErrorDialogOpen(false);
          clearError();
        }}
        error={currentError}
        onAction={handleErrorAction}
      />

      {/* Snackbar for validation errors and success messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={successMessage ? "success" : "error"}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          {successMessage || error || 'Please check your input'}
        </Alert>
      </Snackbar>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          maxWidth: 500,
          mx: 'auto',
          borderRadius: 3,
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
        }}
      >
        {!selectedRole ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {roles.map((role) => (
              <Button
                key={role}
                variant="contained"
                onClick={() => handleSelectRole(role)}
                sx={{
                  textTransform: 'none',
                  fontSize: '18px',
                  minHeight: '45px',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                  }
                }}
              >
                {role}
              </Button>
            ))}
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 2, textAlign: 'left' }}>
              <Button
                type="button"
                onClick={handleBackToRoleSelection}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  px: 0,
                  minWidth: 'auto'
                }}
              >
                Back
              </Button>
            </Box>

            {showWhatsappLogin ? (
              <div className="w-full text-left">
                {socialError && <Alert severity="error" sx={{ mb: 2 }}>{socialError}</Alert>}
                {!showWhatsappOtp ? (
                  <form onSubmit={handleWhatsappSendOtp} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="+1 WhatsApp Number"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!whatsappNumber}
                      className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all disabled:bg-gray-300"
                    >
                      Send OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowWhatsappLogin(false); setSocialError(''); }}
                      className="w-full py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all text-sm"
                    >
                      Back to Email Login
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleWhatsappVerifyOtp} className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 block">Enter Verification Code</label>
                    <p className="text-xs text-gray-500">A 6-digit code has been sent to {whatsappNumber}</p>
                    
                    {whatsappDebugOtp && (
                      <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs">
                        <p className="font-semibold">Dev/Mock Mode OTP: <span className="text-sm font-bold text-gray-900 tracking-widest">{whatsappDebugOtp}</span></p>
                      </div>
                    )}

                    <div className="flex gap-2 justify-center py-2">
                      {whatsappOtp.map((val, idx) => (
                        <input
                          key={idx}
                          id={`vendor-login-otp-${idx}`}
                          type="text"
                          maxLength="1"
                          className="w-10 h-12 text-center text-lg font-bold border border-gray-300 rounded-lg outline-none focus:ring-2"
                          value={val}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all"
                    >
                      Verify &amp; Login
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowWhatsappOtp(false); setSocialError(''); }}
                      className="w-full py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-all text-sm"
                    >
                      Back to Number Entry
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    role: selectedRole
                  }}
                  enableReinitialize
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                  validateOnChange={false}
                  validateOnBlur={true}
                >
                  {({ isSubmitting, errors, touched, handleChange, handleBlur, values }) => (
                    <Form>
                      <input type="hidden" name="role" value={values.role} />

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <DebouncedTextField
                          name="email"
                          type="email"
                          label="Email Address"
                          placeholder="Enter your email address"
                          value={values.email}
                          onChange={(value) => handleChange('email')(value)}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          required
                          size="medium"
                          disabled={loading}
                        />

                        <PasswordField
                          name="password"
                          label="Password"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                          required
                          size="medium"
                          disabled={loading}
                        />

                        <Box sx={{ textAlign: 'right', mt: -1 }}>
                          <Link
                            to="/auth/forgot-password"
                            style={{
                              color: '#1976d2',
                              textDecoration: 'none',
                              fontSize: '0.875rem',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            Forgot Password?
                          </Link>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting || loading}
                            sx={{
                              textTransform: 'none',
                              fontSize: '18px',
                              minWidth: '220px',
                              minHeight: '45px',
                              borderRadius: '8px',
                              boxShadow: 'none',
                              '&:hover': {
                                boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)'
                              }
                            }}
                          >
                            {loading || isSubmitting ? (
                              <CircularProgress size={25} color="inherit" />
                            ) : 'Login'}
                          </Button>
                        </Box>
                      </Box>
                    </Form>
                  )}
                </Formik>

                <div className="mt-6 border-t pt-6" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <p className="text-center text-sm text-gray-500 mb-4" style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Or sign in with</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      onClick={handleGoogleLogin}
                      type="button"
                      style={{ width: '100%', padding: '10px', border: '1px solid #fca5a5', borderRadius: '12px', background: '#fff', fontWeight: 'bold', color: '#475569', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                      <img src="https://www.google.com/favicon.ico" style={{ width: '18px', height: '18px' }} alt="Google Icon" />
                      Sign in with Gmail
                    </button>
                    <button
                      onClick={() => { setShowWhatsappLogin(true); setSocialError(''); }}
                      type="button"
                      style={{ width: '100%', padding: '10px', border: '1px solid #86efac', borderRadius: '12px', background: '#fff', fontWeight: 'bold', color: '#475569', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                    >
                      <svg style={{ width: '18px', height: '18px', color: '#22c55e' }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.407 9.864-9.822.002-2.623-1.02-5.09-2.877-6.949-1.856-1.857-4.325-2.88-6.953-2.882-5.437 0-9.862 4.408-9.866 9.825-.001 1.83.5 3.61 1.45 5.178l-.95 3.47 3.562-.934zM17.91 14.8c-.324-.162-1.916-.946-2.21-1.054-.294-.108-.507-.162-.72.162-.213.324-.827 1.054-1.012 1.27-.185.216-.37.243-.694.08-1.748-.872-2.903-1.416-4.053-2.392-.303-.257-.59-.576-.856-.96-.185-.324-.02-.5-.182-.661-.146-.145-.324-.378-.486-.567-.162-.189-.216-.324-.324-.54-.108-.216-.054-.405-.027-.567.027-.162.216-.513.324-.675.108-.162.145-.27.216-.405.072-.135.036-.252-.018-.405-.054-.153-.507-1.224-.694-1.674-.183-.44-.367-.38-.507-.387-.13-.006-.28-.008-.43-.008-.15 0-.395.056-.602.28-.206.225-.79.771-.79 1.882 0 1.111.808 2.186.918 2.337.112.15 1.59 2.429 3.85 3.407.537.233 1.002.38 1.343.488.54.172 1.03.148 1.417.09.43-.064 1.32-.54 1.506-1.06.185-.52.185-.966.13-.1.056-.05.216-.243.324-.405z"/>
                      </svg>
                      Sign in with WhatsApp
                    </button>
                  </div>
                </div>
              </>
            )}

            {selectedRole === 'Vendor' ? (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  If you haven't Registered yet?{' '}
                  <Link
                    to="/auth/register"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Register Now
                  </Link>
                </Typography>
              </Box>
            ) : null}
          </>
        )}
      </Paper>
    </AuthLayout>
  );
};

export default Login;