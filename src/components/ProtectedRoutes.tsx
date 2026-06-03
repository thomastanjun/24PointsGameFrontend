import { Navigate, Outlet} from 'react-router-dom';
import { useContext} from 'react';
import { GameClientContext } from '../contexts/GameClientContext';

const ProtectedRoutes = () => {
    const {client} = useContext(GameClientContext);

    return client ? <Outlet /> : <Navigate to="/24PointsGameOnline/" replace/>;
}

export default ProtectedRoutes;