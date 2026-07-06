import re

path = "src/features/auth/pages/VerificationPage.jsx"
with open(path, "r") as f:
    content = f.read()

# 1. Update state declarations
old_state = "const [googleVerified, setGoogleVerified] = useState(!!user?.google_id);"
new_state = """const [googleVerified, setGoogleVerified] = useState(!!user?.email_verified_at);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState(['', '', '', '', '', '']);
  const [emailDebugOtp, setEmailDebugOtp] = useState('');
  const emailOtpInputsRef = useRef([]);"""
content = content.replace(old_state, new_state)

# 2. Replace handleGoogleVerify function
old_func_start = content.index("const handleGoogleVerify = async () => {")
old_func_end = content.index("const sendWhatsappOtp = async () => {")
old_func = content[old_func_start:old_func_end]

new_func = """const sendEmailOtp = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const response = await httpClient.post('/auth/verify/email/send', {
        email: user?.email,
      });
      if (response.data.success) {
        setEmailOtpSent(true);
        if (response.data.data?.otp) setEmailDebugOtp(response.data.data.otp);
        setSuccess('Verification code sent to your email.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send email code.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailOtpChange = (index, value) => {
    if (/[^0-9]/.test(value) && value !== '') return;
    const newOtp = [...emailOtp];
    newOtp[index] = value.substring(value.length - 1);
    setEmailOtp(newOtp);
    if (value && index < 5) emailOtpInputsRef.current[index + 1]?.focus();
  };

  const handleEmailOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !emailOtp[index] && index > 0) {
      emailOtpInputsRef.current[index - 1]?.focus();
    }
  };

  const verifyEmailOtp = async () => {
    setError('');
    setSuccess('');
    const otpValue = emailOtp.join('');
    if (otpValue.length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }
    setLoading(true);
    try {
      const response = await httpClient.post('/auth/verify/email/verify', {
        otp: otpValue,
        email: user?.email,
      });
      if (response.data.success) {
        const updatedUser = response.data.data;
        setGoogleVerified(true);
        setEmailOtpSent(false);
        setEmailOtp(['', '', '', '', '', '']);
        setEmailDebugOtp('');
        dispatch(updateUser(updatedUser));
        setSuccess('Email verified successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email verification failed.');
    } finally {
      setLoading(false);
    }
  };

  """
content = content.replace(old_func, new_func)

# 3. Replace the button JSX block
old_button_start = content.index('<div className="flex items-center gap-4">')
old_button_end = content.index('</div>\n              </div>\n\n              {/* Option 2 - WhatsApp Verification */}')
old_button_block = content[old_button_start:old_button_end]

new_button_block = """<div className="space-y-4">
                  {googleVerified ? (
                    <div className="flex items-center gap-2 text-brand-green font-bold text-sm">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Email Verified
                    </div>
                  ) : (
                    <>
                      {!emailOtpSent ? (
                        <button
                          onClick={sendEmailOtp}
                          disabled={loading}
                          className="flex items-center gap-3 px-6 py-3 border-2 border-red-400 rounded-xl hover:bg-red-50 transition-colors text-sm font-semibold"
                        >
                          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google icon" />
                          <span className="font-bold text-gray-700">Send Code to Email</span>
                        </button>
                      ) : (
                        <div className="space-y-3">
                          {emailDebugOtp && (
                            <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl text-xs">
                              <p className="font-semibold">Dev Mode OTP: <span className="text-sm font-bold text-gray-900 tracking-widest">{emailDebugOtp}</span></p>
                            </div>
                          )}
                          <p className="text-xs text-gray-500">Enter the 6-digit code sent to {user?.email}:</p>
                          <div className="flex space-x-2">
                            {emailOtp.map((val, idx) => (
                              <input
                                key={idx}
                                ref={(el) => (emailOtpInputsRef.current[idx] = el)}
                                className="w-10 h-12 text-center text-lg font-bold border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-green outline-none"
                                maxLength={1}
                                type="text"
                                value={val}
                                onChange={(e) => handleEmailOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleEmailOtpKeyDown(idx, e)}
                                disabled={loading}
                              />
                            ))}
                          </div>
                          <button
                            onClick={verifyEmailOtp}
                            disabled={loading}
                            className="w-full py-2 bg-brand-navy hover:bg-slate-800 text-white font-bold rounded-xl transition-all text-sm"
                          >
                            Verify Email
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Option 2 - WhatsApp Verification */}"""
content = content.replace(old_button_block, new_button_block)

with open(path, "w") as f:
    f.write(content)

print("Done. File updated.")
