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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { integer } from '@codingame/monaco-languageclient';


function createData(
  id: integer,
  name: string,
  lastAttempt: string,
  lastScore: string,
  bestScore: string,
  status: string,
  exerciseName: string,
  exerciseDescription: string,
  isFinished: boolean,
) {
  return {
    id,
    name,
    lastAttempt,
    lastScore,
    bestScore,
    status,
    exerciseName,
    exerciseDescription,
    isFinished,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const id = useParams();

  const testCompletion = () => {
    if (row.isFinished) {
        return <CheckCircleOutlineIcon />;
    } 
    else {
        return <PlayCircleIcon />;
    }
  }

  const history = useHistory();
  const faireRedirection = () => {
      let url = "/exercice/"+row.id;
      history.push(url);
  }

  console.log(id);

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
        <TableCell align="right">{row.lastAttempt}</TableCell>
        <TableCell align="right">{row.lastScore}</TableCell>
        <TableCell align="right">{row.bestScore}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">
          <Button size="small" color="primary" onClick={faireRedirection}>
            {testCompletion()}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h3" gutterBottom component="div">
                {row.exerciseName}
              </Typography>
              <Typography variant='h6' gutterBottom component='div'>
                {row.exerciseDescription}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1, 'Exo 1', '12/09/2021', '6.0', '24', 'ACHIEVED', 'Name 1', 'Desc 1', true),
  createData(2, 'Exo 2', '--', '--', '--', 'NOT ATTEMPTED', 'Name 2', 'Desc 2', false),
  createData(3, 'Exo 3', '26/02/2021', '16.0', '24', 'IN PROGRESS', 'Name 3', 'Desc 3', false),
  createData(4, 'Exo 4', '30/05/2021', '3.7', '67', 'HIGH SCORE', 'Name 4', 'Desc 4', false),
  createData(5, 'Exo 5', '35/06/2021', '16.0', '49', 'ATTEMPTED', 'Name 5', 'Desc 5', true),
];

export default function Exercices() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
      </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper} >
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Exercise list</TableCell>
                    <TableCell align="right">Last attempt</TableCell>
                    <TableCell align="right">Last score</TableCell>
                    <TableCell align="right">Best Score</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.name} row={row}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
  );
}