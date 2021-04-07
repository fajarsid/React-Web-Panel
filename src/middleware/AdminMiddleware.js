import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminMiddle = ({ 
	location,
	component: Component, 
	...rest 
}) => {
    const Role = JSON.parse(localStorage.getItem('AdminRole'));
    return (
        <Route {...rest} 
        render={
            props => Role.id && Role.kpum ? 
                <Component {...props} /> :
                    Role.bpm ? 
                    <Redirect to='/master/dashboard' /> :
                <Redirect to='/' />
        } />
    );
}

export { AdminMiddle };