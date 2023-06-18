import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import { useTitle } from '../hooks/useTitle';
import { useLazyQuery } from '@apollo/client';
import { Users } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';


function handleSubmit(event, senderId, navigate) {
    event.preventDefault();
    return navigate(`/transfer`, { state: senderId });
}

function createData(id, name, email, currentBalance, history) {
    return {
        id,
        name,
        email,
        currentBalance,
        history
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.currentBalance}</TableCell>
                <TableCell align="right"><button style={{'color':'#4fa94d'}} onClick={(event) => { handleSubmit(event, row.id, props.navigate) }}>transfer</button></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Recieved</TableCell>
                                        <TableCell>Sent</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.recieverId === row.id ? historyRow.senderId : ""}</TableCell>
                                            <TableCell>{historyRow.senderId === row.id ? historyRow.recieverId : ""}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">{historyRow.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                senderId: PropTypes.string.isRequired,
                recieverId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
            }),
        ).isRequired,
        currentBalance: PropTypes.number.isRequired
    }).isRequired,
};


export const CustomerList = ({ title }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [getUsers] = useLazyQuery(Users)
    const [rows, setRows] = useState([])

    useEffect(() => {
        getUsers({
            onCompleted(data) {
                setIsLoading(false)
                setRows(data.users.map((user) => {
                    let history = user.recievedTransactions
                    history = history.concat(user.sentTransactions)
                    console.log(history)
                    return createData(user.id, user.name, user.email, user.currentBalance, history)
                }
                ))
            }
        })
    }, [getUsers])
    useTitle(title)
    return (
        <div className='static'>
            {!isLoading ?
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Current Balance</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.id} row={row} navigate={navigate} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> :
                <div className='absolute bottom-1/2 left-1/2'>
                    <CirclesWithBar
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={isLoading}
                        outerCircleColor=""
                        innerCircleColor=""
                        barColor=""
                        ariaLabel='circles-with-bar-loading'
                    />
                </div>
            }

        </div>

    );
}
