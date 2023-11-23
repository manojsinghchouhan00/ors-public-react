import React from 'react'
import { useParams } from 'react-router-dom';

const withRouter= (WrappedComponent) => props => {
    const param = useParams();
 return  <WrappedComponent param={param} {...props} />

}
export default  withRouter;