import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({allowedRoles} : {allowedRoles: string[]}) => {
    const {role, token} = useAuth();
    const location = useLocation();
    return (
        allowedRoles.includes(role || '') ? <Outlet /> : <Navigate to="/login" state= {{from: location}} replace />
    );
}
export default RequireAuth;