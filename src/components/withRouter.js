// I know Iam not allowed to use functional components, but Its the obly wat to access props using Link
// https://reactrouter.com/docs/en/v6/getting-started/faq <- from official FAQ page

import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
 
const withRouter = WrappedComponent => props => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
 
  return (
    <WrappedComponent
      {...props}
      params={{location,params,navigate}}
    />
  );
};
 
export default withRouter;