// SignUpForm.js
function SignUpForm() {
  const [activeTab, setActiveTab] = React.useState('Phone');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const isFormValid = () => {
    if (activeTab === 'Phone') {
      return phoneNumber && verificationCode && password && confirmPassword;
    } else {
      return email && verificationCode && password && confirmPassword;
    }
  };

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: '#f5f5f5',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
      marginTop: '-30px'
    }}>
      <div style={{ background: '#f5f5f5', width: '100%', maxWidth: '380px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px', position: 'relative' }}>
          <span style={{ fontSize: '32px', color: '#666', cursor: 'pointer' }}>×</span>
          <h1 style={{
            fontSize: '24px', fontWeight: 600, color: '#333',
            position: 'absolute', left: '50%', transform: 'translateX(-50%)', margin: 0
          }}>Sign Up</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
          <div onClick={() => setActiveTab('Phone')} style={{
            flex: 1, padding: '10px 20px', fontSize: '14px', fontWeight: 500,
            cursor: 'pointer', color: '#333',
            background: activeTab === 'Phone' ? 'white' : '#e8e8e8',
            borderRadius: '12px', textAlign: 'center', transition: 'all 0.3s',
            border: 'none', boxShadow: activeTab === 'Phone' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
          }}>Phone</div>
          <div onClick={() => setActiveTab('Email')} style={{
            flex: 1, padding: '10px 20px', fontSize: '14px', fontWeight: 500,
            cursor: 'pointer', color: '#333',
            background: activeTab === 'Email' ? 'white' : '#e8e8e8',
            borderRadius: '12px', textAlign: 'center', transition: 'all 0.3s',
            border: 'none', boxShadow: activeTab === 'Email' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
          }}>Email</div>
        </div>

        {/* Phone Tab */}
        {activeTab === 'Phone' && (
          <div style={{ background: 'white', borderRadius: '8px', padding: 0, marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ color: '#333', fontSize: '15px', marginRight: '15px' }}>+234</span>
              <input type="tel" placeholder="Phone number" value={phoneNumber}
                     onChange={e => setPhoneNumber(e.target.value)}
                     style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#333', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
              <input type="text" placeholder="Verification code" value={verificationCode}
                     onChange={e => setVerificationCode(e.target.value)}
                     style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#333', outline: 'none' }} />
              <span style={{ color: '#749cbf', fontSize: '15px', fontWeight: 500, cursor: 'pointer', marginLeft: '10px' }}>Send</span>
            </div>
          </div>
        )}

        {/* Email Tab */}
        {activeTab === 'Email' && (
          <div style={{ background: 'white', borderRadius: '8px', padding: 0, marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
              <input type="email" placeholder="Email address" value={email}
                     onChange={e => setEmail(e.target.value)}
                     style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#333', outline: 'none', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
              <input type="text" placeholder="Verification code" value={verificationCode}
                     onChange={e => setVerificationCode(e.target.value)}
                     style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#333', outline: 'none' }} />
              <span style={{ color: '#749cbf', fontSize: '15px', fontWeight: 500, cursor: 'pointer', marginLeft: '10px' }}>Send</span>
            </div>
          </div>
        )}

        {/* Password */}
        <div style={{ background: 'white', borderRadius: '8px', padding: 0, marginBottom: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
            <input type={showPassword ? 'text' : 'password'} placeholder="Input password" value={password}
                   onChange={e => setPassword(e.target.value)}
                   style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#333', outline: 'none' }} />
            <span onClick={togglePassword} style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', marginLeft: '10px', userSelect: 'none' }}>
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" value={confirmPassword}
                   onChange={e => setConfirmPassword(e.target.value)}
                   style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', color: '#333', outline: 'none' }} />
            <span onClick={toggleConfirmPassword} style={{ color: '#ccc', fontSize: '13px', cursor: 'pointer', marginLeft: '10px', userSelect: 'none' }}>
              {showConfirmPassword ? 'Hide' : 'Show'}
            </span>
          </div>
        </div>

        {/* Invitation */}
        <div style={{
          background: 'white', borderRadius: '8px', padding: '15px', marginBottom: '30px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <span style={{ color: '#ccc', fontSize: '14px' }}>Enter invitation code (Optional)</span>
          <span style={{ color: '#333', fontSize: '18px', fontWeight: 700, letterSpacing: '1px' }}>TYB748C</span>
        </div>

        {/* Submit */}
        <button style={{
          width: '100%', background: isFormValid() ? '#749cbf' : '#ddd',
          color: 'white', border: 'none', borderRadius: '12px', padding: '12px',
          fontSize: '16px', fontWeight: 500, cursor: 'pointer', marginBottom: '20px'
        }}>Sign up</button>

        {/* Sign-in link */}
        <div style={{ textAlign: 'center', color: '#999', fontSize: '14px' }}>
          Already have an account? <a href="#" style={{ color: '#749cbf', textDecoration: 'none' }}>Sign in</a>
        </div>
      </div>
    </div>
  );
}
