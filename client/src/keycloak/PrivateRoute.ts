import { useKeycloak } from '@react-keycloak/web';

interface routeProps {
  children: any;
}

const PrivateRoute = ({ children }: routeProps) => {
  const { keycloak } = useKeycloak();

  const isAuthenticated = keycloak.authenticated;

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
