import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import ChartVote from "./charVote";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  paper_btn: {
    marginTop: theme.spacing.unit * 1,
    width: 150,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme
      .spacing.unit * 1}px`
  },
  paper_chart: {
    marginTop: theme.spacing.unit * 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px ${theme
      .spacing.unit * 1}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing.unit * 1
  }
});

function Dashboard(props) {
  const [status, setStatus] = useState("");
  const { classes } = props;

  useEffect(() => {
    firebase.getCurrentAdmin().then(setStatus);
  }, []);

  if (!firebase.auth.currentUser) {
    firebase.logout();
    props.history.replace("/login");
    return null;
  }

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Hasil Vote
        </Typography>
      </Paper>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Paper className={classes.paper_btn}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              component={Link}
              to="/dashboard"
              className={classes.submit}
            >
              Kembali
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper_chart}>
            <ChartVote />
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}

export default withRouter(withStyles(styles)(Dashboard));
