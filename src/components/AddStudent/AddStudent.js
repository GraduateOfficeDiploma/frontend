'use client'
import * as React from 'react';
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {FormControl, IconButton, InputLabel, Menu, MenuItem, Modal, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {useSession} from "next-auth/react";

export default function AddStudent(props) {
    const [open, setOpen] = React.useState(false);
    const [studentId, setStudentId] = React.useState('');

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleAddStudent = () => {

    }

    return (
        <Box>
            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleOpen}
                sx={{
                    color: 'black',
                    background: 'transparent',
                    boxShadow: 'none',
                    border: `1px solid ${grey[400]}`,
                    textTransform: 'none',
                    borderRadius: '100px',
                    maxWidth: '312px',
                    lineHeight: '22px',
                    '&.MuiButton-root:hover': {
                        bgcolor: grey[300],
                        boxShadow: 'none'
                    }
                }}
            >
                + Add Student
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    zIndex: 1200
                }}
            >
                <>
                    <Box
                        p={5}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '520px',
                            bgcolor: 'white'
                        }}
                    >
                        <Typography sx={{fontWeight: 500, lineHeigth: '28px'}} variant="h5">
                            Add new student
                        </Typography>

                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Student ID"
                            type="text"
                            fullWidth
                            sx={{
                                marginTop: 3,
                            }}
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleAddStudent}
                            sx={{
                                color: 'white',
                                background: grey[900],
                                boxShadow: 'none',
                                textTransform: 'none',
                                borderRadius: '100px',
                                marginTop: 3,
                                '&.MuiButton-root:hover': {
                                    bgcolor: grey[800],
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            Add student
                        </Button>
                    </Box>
                </>
            </Modal>
        </Box>
    );
}
