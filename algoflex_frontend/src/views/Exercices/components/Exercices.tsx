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
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useEffect } from "react";
import { client } from '@services/Axios.client';
import { CodingQuestionInterface } from '@components/interfaces';

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
      <TableRow hover sx={{ '& > *': { borderBottom: 0, paddingTop: 0 } }} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableRow component="th" scope="row" align="center">
          <Typography variant="h6" gutterBottom component="div">
            {row.name}
          </Typography>
        </TableRow>
        <TableCell align="right" onClick={faireRedirection}>
          <Button size="small" color="primary" variant="contained" onClick={faireRedirection}>
            GO
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
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
    client.get('/problems/coding-questions?theme=' + idPage.id,  { withCredentials: false})
        .then(res => {
        setQueryData(res.data);
        })
  }, [idPage.id]);


  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center">
      <Grid>
      </Grid>
          <Grid item xs={8} alignItems="center">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell/>
                    <TableCell align='center'>
                      <Typography variant="h6" gutterBottom component="div">
                        Liste d'exercices
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody component="th" >
                  {queryData.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
  );
}