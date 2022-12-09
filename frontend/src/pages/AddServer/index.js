import {Box, Button, Paper, TextField} from "@mui/material";
import {toast} from "react-toastify";
import axios from "../../axios";
import React from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export const AddServer = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit = async data => {
        try {
            const res = await axios.post('/server/add', data)
            navigate('/')
            toast.success("Сервер успешно добавлен!")
        } catch(e) {
            toast.success("Произошла ошибка при добавлении сервера!")
            console.log("Create server error: ", e)
        }
    };
    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box p={2}>
                    <Box pt={1}>
                        <TextField
                            {...register("name")}
                            fullWidth
                            label="Название"
                        />
                    </Box>
                    <Box pt={1}>
                        <TextField
                            {...register("ip")}
                            fullWidth
                            label="IP"
                        />
                    </Box>
                    <Box pt={1}>
                        <TextField
                            {...register("port")}
                            fullWidth
                            label="PORT"
                        />
                    </Box>
                    <Box pt={1}>
                        <Button type={"submit"} fullWidth variant={'contained'}>Добавить</Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    );
};
