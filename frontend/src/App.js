import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Box from '@mui/material/Box';

// Pages
import Authorpanel from './Pages/Authors/Authorpanel';
import Categoraypanel from './Pages/Categoray/Categoraypanel';
import Postpanel from './Pages/Posts/Postpanel';
import Commentpanel from './Pages/Comments/Commentpanel';
import Accountpanel from './Pages/Accounts/Accountpanel';
import Accounts from './Pages/Accounts/Accounts';
import Comments from './Pages/Comments/Comments';
import Posts from './Pages/Posts/Posts';
import Category from './Pages/Categoray/Categoray';
import Loginform from './Pages/login/Loginform';
import Logout from './Pages/Logout/Logout';

// Context & Components
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './component/Sidebar/Sidebar';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      {isAuthenticated && (
        <Box sx={{ display: 'flex', marginTop: '64px', backgroundColor: '#FFF', paddingBottom: '64px' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <Routes>
              <Route path="/login" element={<Loginform />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<PrivateRoute><Authorpanel /></PrivateRoute>} />
              <Route path="/author" element={<PrivateRoute><Authorpanel /></PrivateRoute>} />
              <Route path="/categoraypanel" element={<PrivateRoute><Categoraypanel /></PrivateRoute>} />
              <Route path="/commentpanel" element={<PrivateRoute><Commentpanel /></PrivateRoute>} />
              <Route path="/accountpanel" element={<PrivateRoute><Accountpanel /></PrivateRoute>} />
              <Route path="/postpanel" element={<PrivateRoute><Postpanel /></PrivateRoute>} />
              <Route path="/accounts" element={<PrivateRoute><Accounts /></PrivateRoute>} />
              <Route path="/comments" element={<PrivateRoute><Comments /></PrivateRoute>} />
              <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
              <Route path="/cat" element={<PrivateRoute><Category /></PrivateRoute>} />
              <Route path="*" element={<PrivateRoute><Authorpanel /></PrivateRoute>} />
            </Routes>
          </Box>
        </Box>
      )}

      {!isAuthenticated && (
        <Routes>
          <Route path="/login" element={<Loginform />} />
          <Route path="*" element={<Loginform />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
