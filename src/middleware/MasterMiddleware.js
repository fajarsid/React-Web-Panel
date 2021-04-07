import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const MasterMiddle = ({ 
	location,
	component: Component, 
	...rest 
}) => {
    const Role = JSON.parse(localStorage.getItem('AdminRole'));
    return (
        <Route {...rest} 
        render={
            props => Role.id && Role.bpm ? 
                <Component {...props} /> :
                    Role.kpum ? 
                    <Redirect to='/dashboard' /> :
                <Redirect to='/login' />
        } />
    );
}

export { MasterMiddle };