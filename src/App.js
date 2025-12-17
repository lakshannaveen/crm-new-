// import React, { useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { loadUser } from './actions/authActions';
// import LoginPage from './pages/Auth/LoginPage';
// import RegisterPage from './pages/Auth/RegisterPage';
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import OwnerDashboard from './pages/Dashboard/OwnerDashboard';
// import ShipDetailsPage from './pages/Dashboard/ShipDetailsPage';
// import TenderManagement from './pages/Dashboard/TenderManagement';
// import ProjectManagement from './pages/Dashboard/ProjectManagement';
// import ProfilePage from './pages/Dashboard/ProfilePage';
// import VesselManagement from './pages/Vessel/VesselManagement';
// import CompanyManagement from './pages/Company/CompanyManagement';
// import SettingsPage from './pages/Settings/SettingsPage';
// import FeedbackPage from './pages/Feedback/FeedbackPage';

// function App() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, loading } = useSelector(state => state.auth);
//   const theme = useSelector(state => state.theme);

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (theme.mode === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme.mode]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
//         <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        
//         {/* Protected Routes */}
//         <Route path="/dashboard" element={isAuthenticated ? <OwnerDashboard /> : <Navigate to="/login" />} />
//         <Route path="/ships/:id" element={isAuthenticated ? <ShipDetailsPage /> : <Navigate to="/login" />} />
//         <Route path="/projects/:id" element={isAuthenticated ? <ProjectManagement /> : <Navigate to="/login" />} />
//         <Route path="/tenders" element={isAuthenticated ? <TenderManagement /> : <Navigate to="/login" />} />
//         <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
//         <Route path="/vessels" element={isAuthenticated && user?.role === 'admin' ? <VesselManagement /> : <Navigate to="/dashboard" />} />
//         <Route path="/companies" element={isAuthenticated && user?.role === 'admin' ? <CompanyManagement /> : <Navigate to="/dashboard" />} />
//         <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
//         {/* Admin Routes */}
//         <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} />
//         <Route path="/feedback" element={isAuthenticated ? <FeedbackPage /> : <Navigate to="/login" />} />
//         <Route path="/feedback/:shipId" element={isAuthenticated ? <FeedbackPage /> : <Navigate to="/login" />} />
//         {/* Default Route */}
//         <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { loadUser } from './actions/authActions';
// import LoginPage from './pages/Auth/LoginPage';
// import RegisterPage from './pages/Auth/RegisterPage';
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import OwnerDashboard from './pages/Dashboard/OwnerDashboard';
// import ShipDetailsPage from './pages/Dashboard/ShipDetailsPage';
// import TenderManagement from './pages/Dashboard/TenderManagement';
// import ProjectManagement from './pages/Dashboard/ProjectManagement';
// import ProfilePage from './pages/Dashboard/ProfilePage';
// import VesselManagement from './pages/Vessel/VesselManagement';
// import CompanyManagement from './pages/Company/CompanyManagement';
// import SettingsPage from './pages/Settings/SettingsPage';
// import FeedbackPage from './pages/Feedback/FeedbackPage';
// import Header from './components/common/Header';

// // Layout component for all authenticated pages
// const AuthenticatedLayout = ({ children, showHeader = true }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {showHeader && <Header />}
//       <div className={showHeader ? "pt-16" : ""}>
//         {children}
//       </div>
//     </div>
//   );
// };

// // Layout for admin pages with different structure
// const AdminLayout = ({ children }) => {
//   return (
//     <AuthenticatedLayout>
//       {children}
//     </AuthenticatedLayout>
//   );
// };

// function App() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, loading } = useSelector(state => state.auth);
//   const theme = useSelector(state => state.theme);

//   useEffect(() => {
//     dispatch(loadUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (theme.mode === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme.mode]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
//       <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
      
//       {/* Protected Routes with Header */}
//       <Route path="/dashboard" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <OwnerDashboard />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/ships/:id" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <ShipDetailsPage />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/projects/:id" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <ProjectManagement />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/tenders" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <TenderManagement />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/profile" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <ProfilePage />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/vessels" element={
//         isAuthenticated && user?.role === 'admin' ? (
//           <AuthenticatedLayout>
//             <VesselManagement />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/dashboard" />
//       } />
      
//       <Route path="/companies" element={
//         isAuthenticated && user?.role === 'admin' ? (
//           <AuthenticatedLayout>
//             <CompanyManagement />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/dashboard" />
//       } />
      
//       <Route path="/settings" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <SettingsPage />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/feedback" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <FeedbackPage />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       <Route path="/feedback/:shipId" element={
//         isAuthenticated ? (
//           <AuthenticatedLayout>
//             <FeedbackPage />
//           </AuthenticatedLayout>
//         ) : <Navigate to="/login" />
//       } />
      
//       {/* Admin Routes */}
//       <Route path="/admin" element={
//         isAuthenticated && user?.role === 'admin' ? (
//           <AdminLayout>
//             <AdminDashboard />
//           </AdminLayout>
//         ) : <Navigate to="/dashboard" />
//       } />
      
//       {/* Default Route */}
//       <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
//     </Routes>
//   );
// }

// export default App;


import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import { SidebarProvider } from './context/SidebarContext';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import TermsPage from './pages/Legal/TermsPage';
import PrivacyPage from './pages/Legal/PrivacyPage';
import ContactPage from './pages/Contact/ContactPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import OwnerDashboard from './pages/Dashboard/OwnerDashboard';
import ShipDetailsPage from './pages/Dashboard/ShipDetailsPage';
import TenderManagement from './pages/Dashboard/TenderManagement';
import ProjectManagement from './pages/Dashboard/ProjectManagement';
import ProfilePage from './pages/Dashboard/ProfilePage';
import VesselManagement from './pages/Vessel/VesselManagement';
import CompanyManagement from './pages/Company/CompanyManagement';
import SettingsPage from './pages/Settings/SettingsPage';
import FeedbackPage from './pages/Feedback/FeedbackPage';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import LoadingScreen from './components/common/LoadingScreen';


const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <div className="pt-16">
        <div className="md:ml-6">
          <main className="p-2 sm:p-2 lg:p-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

// Layout for admin pages
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <div className="pt-6">
        <div className="md:ml-6">
          <main className="p-4 sm:p-2 lg:p-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme.mode]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SidebarProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <OwnerDashboard />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/ships/:id" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ShipDetailsPage />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/projects/:id" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ProjectManagement />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/tenders" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <TenderManagement />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/profile" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ProfilePage />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/vessels" element={
          isAuthenticated && user?.role === 'admin' ? (
            <AuthenticatedLayout>
              <VesselManagement />
            </AuthenticatedLayout>
          ) : <Navigate to="/dashboard" />
        } />
        
        <Route path="/companies" element={
          isAuthenticated && user?.role === 'admin' ? (
            <AuthenticatedLayout>
              <CompanyManagement />
            </AuthenticatedLayout>
          ) : <Navigate to="/dashboard" />
        } />
        
        <Route path="/settings" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <SettingsPage />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/feedback" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <FeedbackPage />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        <Route path="/feedback/:shipId" element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <FeedbackPage />
            </AuthenticatedLayout>
          ) : <Navigate to="/login" />
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          isAuthenticated && user?.role === 'admin' ? (
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          ) : <Navigate to="/dashboard" />
        } />
        
        {/* Default Route */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;