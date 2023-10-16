'use client'
import * as React from 'react';
import Grid from "@mui/material/Grid";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import {Alert, AlertTitle, colors, Fade, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import axios from "axios";
import {useSession} from "next-auth/react";
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import DateRangeIcon from '@mui/icons-material/DateRange';

export default function CreateCourse(props) {
    const [open, setOpen] = React.useState(false);
    const [courseName, setCourseName] = React.useState('');
    const [date, setDate] = React.useState([]);
    const [image, setImage] = React.useState(null);
    const session = useSession();
    const {alertVisibility, setAlertVisibility, setCourses} = props;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateCourse = () => {
        const fd = new FormData();
        fd.append('image', image);
        fd.append('name', courseName);

        date.forEach(item => {
            fd.append('schedule[]', dayjs(item).toString());
        })

        console.log('kuku', fd)

        axios.post(`${process.env.BACKEND_URL}/api/courses`, fd, {
            headers: {
                Authorization: `Bearer ${session.data.user.accessToken}`
            }
        })
        .then(function (response) {
            setAlertVisibility({visible: true, type: 'success', message: 'Course created successfully'});

            axios.get(`${process.env.BACKEND_URL}/api/courses`, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                setCourses([...response.data]);
            })
            .catch(function (error) {
                console.log('kuku', error)
            });

            handleClose();
        })
        .catch(function (error) {
            setAlertVisibility({visible: true, type: 'error', message: 'Error creating course'});
        });
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
                <AddIcon sx={{width: 48, height: 48}}/>
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
                            {image ?
                                <img
                                    style={{
                                        width: 52,
                                        height: 52,
                                        bgcolor: grey[200],
                                        border: `1px solid ${grey[400]}`,
                                        borderRadius: '4px',
                                        objectFit: 'cover'
                                    }}
                                    src={URL.createObjectURL(image)}
                                />
                                :
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        bgcolor: grey[200],
                                        border: `1px solid ${grey[400]}`,
                                        borderRadius: '4px'
                                    }}
                                />
                            }


                            <form
                                style={{
                                    maxWidth: '312px',
                                    width: '100%',
                                }}
                                encType="multipart/form-data"
                                action=""
                            >
                                <label
                                    style={{
                                        maxWidth: '312px',
                                        width: '100%',
                                    }}
                                    htmlFor="file-input"
                                >
                                    <input
                                        id="file-input"
                                        type="file"
                                        name="image"
                                        multiple
                                        style={{
                                            display: 'none'
                                        }}
                                        onChange={(event) => {
                                            setImage(event.target.files[0]);
                                        }}
                                    />
                                    <Box
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        htmlFor="file-input"
                                        sx={{
                                            color: darkGrey,
                                            background: 'transparent',
                                            boxShadow: 'none',
                                            border: `1px solid ${grey[400]}`,
                                            textTransform: 'none',
                                            borderRadius: '100px',
                                            maxWidth: '312px',
                                            width: '100%',
                                            padding: '10px 22px',
                                            fontWeight: 500,
                                            textAlign: 'center',
                                            transition: 'background-color 100ms linear',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            '&:hover': {
                                                backgroundColor: grey[300],
                                                boxShadow: 'none',
                                                cursor: 'pointer',
                                            }
                                        }}
                                    >
                                        {image?.name || '+ Choose a cover'}
                                    </Box>
                                </label>
                            </form>
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

                        <Box sx={{position: 'relative'}}>
                            <Box sx={{position: 'absolute', left: '8px', top: '8px'}}>
                                <DateRangeIcon/>
                            </Box>
                            <DatePicker
                                value={date}
                                multiple
                                onChange={setDate}
                                disableMonthPicker
                                disableYearPicker
                                placeholder="Choose dates"
                                arrow={false}
                                style={{
                                    width: "100%",
                                    height: '40px',
                                    padding: '16px 16px 16px 40px',
                                    fontSize: '16px'
                                }}
                                containerStyle={{
                                    width: "100%"
                                }}
                                plugins={[
                                    <DatePanel/>
                                ]}
                            />
                        </Box>

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
                </>
            </Modal>
        </Grid>
    );
}
