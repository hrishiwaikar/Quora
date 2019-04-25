import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';


const verifyToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token)
        return false

    try {
        const { exp } = decode(token)
        if (exp < new Date().getTime()/1000){
            return false;
        }
            
    } catch (e) {
        return false
    }
    return true;
}

function PrivateRoute({ component: Component, ...rest }) {

    return (
        <Route
            {...rest}
            render={props =>
                verifyToken() ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;