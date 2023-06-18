import React, { Fragment, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useLazyQuery } from '@apollo/client';
import { Users } from '../graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../redux/slice';


export const Asynchronous = (props) => {
    console.log(props)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.bankState.recieverId)
    const [options, setOptions] = useState([]);
    const [getUsers] = useLazyQuery(Users)
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        getUsers({
            onCompleted(data) {
                const allUsers = data.users.map((user) => (user.id))
                const filteredUsers = allUsers.filter((element) => element !== props.senderId)
                if (active) {
                    setOptions([...filteredUsers]);
                }
            }
        })

        return () => {
            active = false;
        };
    }, [loading, getUsers, props.senderId]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            value={selectedUser}
            onChange={(value) => { dispatch(set(value.target.innerText)) }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}


