import React, { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel, TextareaAutosize } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import ImageUpload from '../../Register/upload'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 1000,
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
    paper_form: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
    },
    form_top: {
		width: '100%',
		margin: theme.spacing.unit,
	},
	form: {
		width: '100%',
		margin: theme.spacing.unit * 2,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function RegisterUser(props) {
    const { classes, match } = props
    const [id, setId] = useState('')
	const [nama, setNama] = useState('')
    const [nim, setNim] = useState('')
    const [prodi, setProdi] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        fetchData(match.params.id);
        return () => {
            fetchData(match.params.id)
        }
    },[match])

    const fetchData = async (id) => {
        const data = await firebase.editUser(id);
        setId(id);
        setNama(data.nama)
        setNim(data.nim)
        setProdi(data.prodi)
        setEmail(data.email)
        setPassword(data.password)
    };

    const onUpdateUser = async () => {
		try {
			const update = await firebase.updateUser(
                id,
                nama,
                nim,
                prodi,
                email,
                password
            );

            if(update) {
                setId(update.id);
                setNama(update.nama)
                setNim(update.nim)
                setProdi(update.prodi)
                alert('Data berhasil di update')
            }

            //props.history.replace('/dashboard')
		} catch(error) {
			alert(error.message)
		}
	}

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
						onClick={onUpdateUser}
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
}

const EditUser = withRouter(withStyles(styles)(RegisterUser))
export {EditUser}
