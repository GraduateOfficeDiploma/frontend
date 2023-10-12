'use client'
import * as React from 'react';
import Grid from "@mui/material/Grid";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from "axios";

export default function CreateCourse() {
    const [open, setOpen] = React.useState(false);
    const [courseName, setCourseName] = React.useState('');
    const [date, setDate] = React.useState(dayjs('2023-01-01'));
    const [image, setImage] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateCourse = () => {
        console.log('kuku', courseName, date.toString(), image);

        axios.post('http://localhost:8010/api/courses', {
            name: courseName,
            schedule: [date.toString()],
            image: image
        })
        .then(function (response) {
            console.log('kuku', response)
        })
        .catch(function (error) {
            console.log('kuku response', error);
        });

        handleClose();
    }

    const darkGrey = '#373737';

    return (
        <Grid
            item
            xs={6}
            md={4}
        >
            <Button
                fullWidth
                onClick={handleOpen}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    border: `1px dashed ${grey[400]}`,
                    padding: '60px 16px',
                    height: '100%',
                    textTransform: 'none',
                    color: grey[900],
                    '&.MuiButton-root:hover': {
                        bgcolor: grey[300],
                        border: `1px solid ${grey[400]}`
                    },
                    '&.MuiButton-root:active': {
                        bgcolor: grey[300],
                        border: `1px solid ${grey[300]}`
                    },
                    '&& .MuiTouchRipple-child': {
                        bgcolor: grey[400]
                    }
                }}
            >
                <AddIcon sx={{ width: 48, height: 48 }} />
                <Typography
                    sx={{
                        fontSize: 22,
                        lineHeight: '26px',
                        fontWeight: 500,
                        margin: "8px 0 0"
                    }}
                    variant="h6"
                >
                    Create new course
                </Typography>
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
                        Create new course
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '16px',
                            marginTop: 3
                        }}
                    >
                        <Box
                            sx={{
                                width: 52,
                                height: 52,
                                bgcolor: grey[200],
                                border: `1px solid ${grey[400]}`,
                                borderRadius: '4px'
                            }}
                        >

                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                color: darkGrey,
                                background: 'transparent',
                                boxShadow: 'none',
                                border: `1px solid ${grey[400]}`,
                                textTransform: 'none',
                                borderRadius: '100px',
                                maxWidth: '312px',
                                '&.MuiButton-root:hover': {
                                    bgcolor: grey[300],
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            <input
                                type="file"
                                name="image"
                                onChange={(event) => {
                                    setImage(event.target.files[0]);
                                }}
                            />
                            + Choose a cover
                        </Button>
                    </Box>

                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Course name"
                        type="text"
                        fullWidth
                        sx={{
                            marginTop: 3,
                            marginBottom: 3
                        }}
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Schedule"
                            value={date}
                            sx={{
                                "&.MuiTextField-root": {
                                    width: '100%',
                                }
                            }}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </LocalizationProvider>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleCreateCourse}
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
                        Create course
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
}
