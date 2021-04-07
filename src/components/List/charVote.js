import React, { Component } from "react";
import {
    Paper,
  } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import App from "../firebase";
import PieChart from "react-minimal-pie-chart";

class ChartVote extends React.Component {
  constructor(props) {
    super(props);
    this.ref = App.db.collection("calon");
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }
  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const { nama, hasil } = doc.data();
      boards.push({
        key: doc.id,
        doc,
        nama,
        hasil
      });
    });
    this.setState({
      boards
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
        <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper>
          <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nama Calon</TableCell>
                <TableCell align="right">Hasil Vote</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.boards.map(board => (
                <TableRow key={board.nama}>
                  <TableCell component="th" scope="row">
                    {board.nama}
                  </TableCell>
                  <TableCell align="right">{board.hasil}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <PieChart
          data={
            this.state.boards.map(board => (
                {title: board.nama, value: board.hasil, color: "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16)})}
            )
            )}
        />
        </Grid>
      </Grid>
    );
  }
}

export default ChartVote;
