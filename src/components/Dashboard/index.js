import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 700,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	paper_btn: {
		marginTop: theme.spacing.unit * 2,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	paper_top: {
		marginTop: theme.spacing.unit * 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		margin: theme.spacing.unit * 1,
	},
})

function Dashboard(props) {

	const { classes } = props

	// const [status, setStatus] = useState('')

	// useEffect(() => {
	// 	firebase.getCurrentAdmin().then(setStatus)
	// }, [])

	// if(!firebase.auth.currentUser) {
	// 	firebase.logout()
	// 	props.history.replace('/login')
	// 	return null
	// }

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Admin Panel
				</Typography>
			</Paper>
			<Paper className={classes.paper_top}>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/calon"
					className={classes.submit}>
					Register Calon
          		</Button>
				  <Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/user"
					className={classes.submit}>
					Register User
          		</Button>
			</Paper>
			<Paper className={classes.paper_btn}>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/listdata"
					className={classes.submit}>
					Hasil Vote
          		</Button>
			</Paper>
			<Paper className={classes.paper_btn}>
				  <Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					onClick={logout}
					className={classes.submit}>
					Logout
          		</Button>
			</Paper>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
}

export default withRouter(withStyles(styles)(Dashboard))