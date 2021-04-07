import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuestMiddle = ({ 
	location,
	component: Component, 
	...rest 
}) => {
    const Check = localStorage.getItem('AdminRole');
    if(Check === null) {
        localStorage.setItem('AdminRole', JSON.stringify({}));
    }
    const Role = JSON.parse(Check);
    return (
        <Route 
            {...rest} 
            render={
                props => !Role.id ? 
                <Component {...props} /> :
                    Role.bpm ? 
                    <Redirect to="/master/dashboard" /> :
                <Redirect to="/dashboard" />
            }
        />
    )
};

export { GuestMiddle };