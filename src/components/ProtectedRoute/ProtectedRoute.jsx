import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, reload, children }) {
  if (!isLoggedIn) {
    reload('login');
    return <Navigate to="/" replace />
  }
    
  return children;
}

export default ProtectedRoute;