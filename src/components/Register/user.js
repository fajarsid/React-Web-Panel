import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'
const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', 
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
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
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', 
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function RegisterUser(props) {
	const { classes } = props

	const [nama, setNama] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [nim, setNim] = useState('')
    const [prodi, setProdi] = useState('')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					RegisterUser Account
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false }>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="nama">Name</InputLabel>
                        <Input 
                        id="nama" 
                        name="nama" 
                        autoComplete="off" 
                        autoFocus value={nama} 
                        onChange={e => setNama(e.target.value)} />
					</FormControl>
                    <FormControl className={classes.form} margin="normal" required fullWidth>
						<InputLabel htmlFor="nim">NIM</InputLabel>
                        <Input 
                        name="nim" 
                        type="text" 
                        id="nim" 
                        autoComplete="off" 
                        value={nim} 
                        onChange={e => setNim(e.target.value)}  />
					</FormControl>
                    <FormControl className={classes.form} margin="normal" required fullWidth>
						<InputLabel htmlFor="prodi">Prodi</InputLabel>
                        <Input 
                        name="prodi" 
                        type="text" 
                        id="prodi" 
                        autoComplete="off" 
                        value={prodi} 
                        onChange={e => setProdi(e.target.value)}  />
					</FormControl>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input 
                        id="email" 
                        name="email" 
                        autoComplete="off" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="password">Password</InputLabel>
                        <Input 
                        name="password" 
                        type="password" 
                        id="password" 
                        autoComplete="off" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}  />
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegisterUser}
						className={classes.submit}>
						Registrasi User
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/dashboard"
						className={classes.submit}>
						Kembali
          			</Button>
				</form>
			</Paper>
		</main>
	)

	async function onRegisterUser() {
		try {
			await firebase.register(nama, email, password)
			alert('Data Sedang Di Upload Mohon Tunggu ...')
			await firebase.addUser(nama, nim, prodi, email)
			props.history.replace('/dashboard')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default withRouter(withStyles(styles)(RegisterUser))