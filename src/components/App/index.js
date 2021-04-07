import React, { useState, useEffect } from 'react'
import './styles.css'
import { CredentialRoutes, AdminRoutes, MasterRoutes } from '../../routes/web';
import {
	GuestMiddle,
	AdminMiddle,
	MasterMiddle
} from '../../middleware';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

const theme = createMuiTheme()

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					{CredentialRoutes.map(crd => (
						<GuestMiddle
							key={crd.label}
							exact={crd.exact}
							path={crd.path}
							component={crd.component}
						/>
					))}
					{AdminRoutes.map(admin => (
						<AdminMiddle
							key={admin.label}
							exact={admin.exact}
							path={admin.path}
							component={admin.component}
						/>
					))}
					{MasterRoutes.map(master => (
						<MasterMiddle
							key={master.label}
							exact={master.exact}
							path={master.path}
							component={master.component}
						/>
					))}
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}