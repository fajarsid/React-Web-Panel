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

function RegisterCalon(props) {
    const { classes, match } = props
    const [id, setId] = useState('')
	const [nama, setNama] = useState('')
    const [nim, setNim] = useState('')
    const [prodi, setProdi] = useState('')
    const [angkatan, setAngkatan] = useState('')
    const [nourut, setNourut] = useState('')
    const [detail2, setDetail] = useState('')
    const [visi, setVisi] = useState('')
    const [misi, setMisi] = useState('')
    const [foto, setFoto] = useState('')
    const [hasil, setHasil] = useState(0)

    useEffect(() => {
        fetchData(match.params.id);
        return () => {
            fetchData(match.params.id)
        }
    },[match])

    const fetchData = async (id) => {
        const data = await firebase.editCalon(id);
        setId(id);
        setNama(data.nama)
        setNim(data.nim)
        setProdi(data.prodi)
        setAngkatan(data.angkatan)
        setNourut(data.nourut)
        setDetail(data.detail2)
        setVisi(data.visi)
        setMisi(data.misi)
        setFoto(data.foto)
        setHasil(data.hasil)
    };

    const onUpdateCalon = async () => {
		try {
			const update = await firebase.updateCalon(
                id,
                nama, 
                nim, 
                prodi, 
                angkatan, 
                nourut, 
                detail2, 
                visi, 
                misi,
                foto, 
                hasil
            );

            if(update) {
                setId(update.id);
                setNama(update.nama)
                setNim(update.nim)
                setProdi(update.prodi)
                setAngkatan(update.angkatan)
                setNourut(update.nourut)
                setDetail(update.detail2)
                setVisi(update.visi)
                setMisi(update.misi)
                setFoto(update.foto)
                setHasil(update.hasil)
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
                Registrasi Calon BEM
       			</Typography>
				<form className={classes.form_top} onSubmit={e => e.preventDefault() && false }>
                <Paper className={classes.paper_form}>
                <FormControl className={classes.form} margin="normal" required fullWidth>
						<InputLabel htmlFor="nama">Nama Lengkap</InputLabel>
                        <Input 
                        name="nama" 
                        type="text" 
                        id="nama" 
                        autoComplete="off" 
                        value={nama} 
                        onChange={e => setNama(e.target.value)}  />
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
                </Paper>
                <Paper className={classes.paper_form}>
                <FormControl className={classes.form} margin="normal" required fullWidth>
						<InputLabel htmlFor="angkatan">Angkatan</InputLabel>
                        <Input 
                        name="angkatan" 
                        type="text" 
                        id="angkatan" 
                        autoComplete="off" 
                        value={angkatan} 
                        onChange={e => setAngkatan(e.target.value)}  />
					</FormControl>
                    <FormControl className={classes.form} margin="normal" required fullWidth>
						<InputLabel htmlFor="nourut">Nomor Urut</InputLabel>
                        <Input 
                        name="nourut" 
                        type="text" 
                        id="nourut" 
                        autoComplete="off" 
                        value={nourut} 
                        onChange={e => setNourut(e.target.value)}  />
					</FormControl>
                    <FormControl className={classes.form} margin="normal" required fullWidth>
						<InputLabel htmlFor="detail">Keterangan</InputLabel>
                        <Input 
                        name="detail" 
                        type="text" 
                        id="detail" 
                        autoComplete="off" 
                        value={detail2} 
                        onChange={e => setDetail(e.target.value)}  />
					</FormControl>
                </Paper>
                <Paper className={classes.paper_form}>
                <FormControl className={classes.form} margin="normal" required fullWidth>
                        <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder="Visi"
                        name="visi" 
                        type="text" 
                        id="visi" 
                        autoComplete="off" 
                        value={visi} 
                        onChange={e => setVisi(e.target.value)}  />
					</FormControl>
                    <FormControl className={classes.form} margin="normal" required fullWidth>
                        <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder="Misi" 
                        name="misi" 
                        type="text" 
                        id="misi" 
                        autoComplete="off" 
                        value={misi} 
                        onChange={e => setMisi(e.target.value)}  />
					</FormControl>
                    <ImageUpload/>
                </Paper>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel htmlFor="foto">Klik Copy Foto Dan Paste Disini!</InputLabel>
                        <Input 
                        name="foto" 
                        type="text" 
                        id="foto" 
                        autoComplete="off" 
                        value={foto} 
                        onChange={e => setFoto(e.target.value)}  />
					</FormControl>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onUpdateCalon}
						className={classes.submit}>
						Update
          			</Button>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/master/calon"
						className={classes.submit}>
						Kembali
          			</Button>
				</form>
			</Paper>
		</main>
	)
}

const EditCalon = withRouter(withStyles(styles)(RegisterCalon))
export {EditCalon}