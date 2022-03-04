import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useHistory, useParams } from 'react-router';
import { Button, Grid } from '@mui/material';
import { useEffect } from "react";
import axios from 'axios';
import { CodingQuestionInterface } from '@components/interfaces';
import baseUrl from '../../../components/global';

function Row(props: { row: CodingQuestionInterface }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const faireRedirection = () => {
      let url = "/exercice/"+row.uid;
      history.push(url);
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset', backgroundColor: 'white'} }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">
          <Button size="small" color="primary" variant="contained" onClick={faireRedirection}>
            GO
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h3" gutterBottom component="div">
                {row.name}
              </Typography>
              <Typography variant='h6' gutterBottom component='div'>
                {row.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function Exercices() {
  let idPage = useParams<any>();
  const [queryData, setQueryData] = React.useState<CodingQuestionInterface[]>([]);

  useEffect(() => {
    axios.get(baseUrl + '/problems/coding-questions?theme=' + idPage.id,  { withCredentials: false})
        .then(res => {
        setQueryData(res.data);
        })
  }, [idPage.id])

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
      </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Exercise list</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queryData.map((row) => (
                    <Row key={row.name} row={row}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
  );
}