import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    Avatar, 
    CircularProgress,
    Paper, 
    Table, 
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText
} from '@material-ui/core';
import People from '@material-ui/icons/People';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import firebase from '../../firebase';

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
    paperTable: {
        padding: 20
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
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

class ListCalons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            calons: [],
            openDialog: false,
            calonId: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({
            loading: true
        })
        const data = await firebase.getCalon();
        if(data.length) {
            this.setState({
                loading: false,
                calons: data
            })
        }
    }

    handleDialog = (id) => this.setState((prevState) => ({
        openDialog: !prevState.openDialog,
        calonId: id ? id : ''
    }))

    onRemoveOpen = async (id) => {
        const remove = await firebase.removeCalon(id);
        if(remove) {
            this.handleDialog();
            return this.fetchData();
        }
    }
    
    render() {
        const {loading, calons, openDialog, calonId} = this.state;
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <People />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                       List Data Calon
                    </Typography>
                </Paper>
                <Paper className={classes.paperTable}>
                    {loading && <CircularProgress />}
                    {!loading && !calons.length && (
                        <Paper>Tidak Ada Data</Paper>
                    )}
                    {!loading && calons.length > 0 && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nama</TableCell>
                                    <TableCell>Nim</TableCell>
                                    <TableCell>Angkatan</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {calons.map((calon, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{calon.nama}</TableCell>
                                        <TableCell>{calon.nim}</TableCell>
                                        <TableCell>{calon.angkatan}</TableCell>
                                        <TableCell>
                                            <Button 
                                                startIcon={<EditIcon />}
                                                variant='contained' 
                                                color='primary'
                                                component={Link}
                                                to={`/master/calon/${calon.id}/edit`}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                startIcon={<DeleteIcon />}
                                                variant='contained' 
                                                color='secondary'
                                                onClick={() => this.handleDialog(calon.id)}
                                            >
                                                Hapus
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    <Dialog
                        open={openDialog}
                        onClose={this.handleDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Apakah anda yakin menghapus data ini?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Data tidak akan bisa dipulihkan.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleDialog} color="primary">
                            Tidak
                        </Button>
                        <Button onClick={() => this.onRemoveOpen(calonId)} color="primary" autoFocus>
                        Ya
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/master/dashboard"
                    className={classes.submit}>
                    Kembali
                </Button>
            </main>
        )
    }
}

const ListCalon = withStyles(styles)(ListCalons);
export {ListCalon}