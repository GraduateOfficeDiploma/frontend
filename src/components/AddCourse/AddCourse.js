import * as React from 'react';
import Grid from "@mui/material/Grid";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Alert, AlertTitle, Fade, Modal, TextField} from "@mui/material";
import axios from "axios";
import {useSession} from "next-auth/react";

export default function AddCourse(props) {
    const [open, setOpen] = React.useState(false);
    const [courseCode, setCourseCode] = React.useState('');
    const [alertVisibility, setAlertVisibility] = React.useState({visible: false, type: ''});
    const session = useSession();
    const {setCourses} = props;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddCourse = () => {
        axios.post(`${process.env.BACKEND_URL}/api/courses/${courseCode}/join`, {
            courseId: courseCode,
        }, {
            headers: {
                Authorization: `Bearer ${session.data.user.accessToken}`
            }
        })
        .then(function (response) {
            setAlertVisibility({visible: true, type: 'success'});

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
            setAlertVisibility({visible: true, type: 'error'});
        });
    }

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
                    padding: 2,
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
                    Join new course
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
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            left: 16,
                            width: '500px'
                        }}
                    >
                        <Fade
                            in={alertVisibility.visible}
                            timeout={{enter: 100, exit: 100}}
                            addEndListener={() => {
                                const timeout = setTimeout(() => {
                                    setAlertVisibility({visible: false, type: ''})

                                    return clearTimeout(timeout);
                                }, 4000);
                            }}
                        >
                            <Alert
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                severity={alertVisibility.type}
                                variant="standard"
                            >
                                <AlertTitle
                                    sx={{
                                        color: alertVisibility.type === 'success' ? '#2e7d32' : '#d32f2f',
                                        lineHeight: '20px',
                                        margin: 0,
                                        padding: 0,
                                    }}
                                >
                                    {
                                        alertVisibility.type === 'success' ?
                                            'Course added successfully' :
                                            'Error adding course'
                                    }
                                </AlertTitle>
                            </Alert>
                        </Fade>
                    </Box>
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
                            Join new course
                        </Typography>

                        <TextField
                            variant="filled"
                            margin="normal"
                            label="Course name"
                            type="text"
                            fullWidth
                            sx={{
                                marginTop: 3,
                            }}
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleAddCourse}
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
                            Join course
                        </Button>
                    </Box>
                </>
            </Modal>
        </Grid>
    );
}
