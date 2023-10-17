'use client'
import * as React from 'react';
import {green, grey, red} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Modal, TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Link from "next/link";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import dayjs from "dayjs";
import {useSession} from "next-auth/react";
import axios from "axios";
import {useEffect} from "react";
import FileSaver from "file-saver";
import Grid from "@mui/material/Grid";

export default function Course({task, taskId, isTeacher, id, handleGetStudentsTasks}) {
    const textColor = "#6E6E6E";
    const darkGrey = '#373737';

    const [message, setMessage] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [fileToSend, setFileToSend] = React.useState(null);
    const [isGraded, setIsGraded] = React.useState(false);
    const [grade, setGrade] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const session = useSession();

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        const newFiles = [];

        task.attachments.forEach(file => {
            if (!newFiles.find(item => item.fileName === file.fileName)) {
                newFiles.push(file);
            }
        })

        task.submissions[0]?.attachments.forEach(file => {
            if (!newFiles.find(item => item.fileName === file.fileName)) {
                newFiles.push(file);
            }
        })

        setFiles([...newFiles]);
    }, [task]);

    const handleSendSubmission = () => {
        const fd = new FormData();
        fd.append('attachments', fileToSend);

        axios.post(`${process.env.BACKEND_URL}/api/tasks/${task.id}/submit`, fd, {
            headers: {
                Authorization: `Bearer ${session.data.user.accessToken}`
            }
        })
        .then(function (response) {
            setFileToSend(null);

            if(handleGetStudentsTasks) {
                handleGetStudentsTasks();
            }
        })
        .catch(function (error) {
            console.log('kuku error', error);
        });
    }

    const handleDownloadFile = (file) => {
        FileSaver.saveAs(file.url, file.fileName);
    }

    const handleGrade = () => {
        axios.patch(`${process.env.BACKEND_URL}/api/tasks/${task.id}/submissions/${task.submissions[0].id}/evaluate`,
            {
                grade: grade
            }, {
            headers: {
                Authorization: `Bearer ${session.data.user.accessToken}`
            }
        })
        .then(function (response) {
            if(handleGetStudentsTasks) {
                handleGetStudentsTasks();

                handleClose();
            }
        })
        .catch(function (error) {
            console.log('kuku error', error);
        });
    }

    const handleFail = () => {
        axios.patch(`${process.env.BACKEND_URL}/api/tasks/${task.id}/submissions/${task.submissions[0].id}/evaluate`,
            {
                grade: 1
            }, {
                headers: {
                    Authorization: `Bearer ${session.data.user.accessToken}`
                }
            })
            .then(function (response) {
                if(handleGetStudentsTasks) {
                    handleGetStudentsTasks();
                }
            })
            .catch(function (error) {
                console.log('kuku error', error);
            });
    }

    return (
        <Accordion
            sx={{
                bgcolor: grey[200],
                border: `1px solid ${grey[400]}`,
                borderRadius: '8px !important',
                boxShadow: 'none',
                margin: '0px !important',
                '&.MuiButton-root:hover': {
                    bgcolor: grey[200],
                },
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        margin: '2px 0'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <StickyNote2OutlinedIcon/>
                        <Typography sx={{fontWeight: 500, lineHeight: '24px'}} variant="h6">
                            {task?.title}
                        </Typography>
                    </Box>
                    <Typography variant="body1">
                        { task.submissions[0]?.grade ? (task.submissions[0]?.grade < 60 ? 'Failed' : task.submissions[0]?.grade) : 'Not graded'}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: '0 16px 16px'
                }}
            >

                { task?.description &&
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 1
                            }}
                        >
                            <Typography m={0} sx={{fontWeight: 500}} variant="h6">
                                Description
                            </Typography>
                            <Typography sx={{fontWeight: 400}} variant="body1">
                                {task?.description}
                            </Typography>
                        </Box>

                        <Divider sx={{margin: '16px 0 16px'}} />
                    </>
                }

                <Grid sx={{marginBottom: 2}} container spacing={2}>
                    { files.map(file => {
                        return (
                            <Grid item xs={6}>
                                <Button
                                    onClick={() => handleDownloadFile(file)}
                                    style={{
                                        display: "flex",
                                        textDecoration: 'none',
                                        width: '100%',
                                        border: `1px solid ${grey[400]}`,
                                        borderRadius: '8px',
                                        padding: 0,
                                        margin: 0,
                                        textTransform: 'none'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '30%',
                                            minHeight: 86,
                                            bgcolor: grey[400],
                                            color: 'white',
                                            borderRadius: '4px 0 0 4px',
                                        }}
                                    >
                                        Download
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            width: '70%',
                                            padding: 2
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                color: 'black',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                width: '100%'
                                            }}
                                        >
                                            { file.fileName }
                                        </Typography>
                                    </Box>
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>

                {files.length > 0 &&
                    <Divider
                        sx={{
                            marginBottom: 2
                        }}
                    />
                }

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: isTeacher ? 'flex-end' : 'space-between',
                        gap: '8px'
                    }}
                >
                    { !isTeacher &&
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '4px'
                                }}
                            >
                                <CalendarTodayIcon/>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: textColor
                                    }}
                                >
                                    Posted: {dayjs().format('DD.MM.YYYY')}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '4px'
                                }}
                            >
                                <CalendarTodayIcon/>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: textColor
                                    }}
                                >
                                    Due date: {dayjs(task?.dueDate).format('DD.MM.YYYY')}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: '4px'
                                }}
                            >
                                <StarBorderIcon/>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: textColor
                                    }}
                                >
                                    Grade: { task.submissions[0]?.grade ? (task.submissions[0]?.grade < 60 ? 'Failed' : task.submissions[0]?.grade) : 'Not graded'}
                                </Typography>
                            </Box>
                        </Box>
                    }

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: isTeacher ? 'flex-end' : 'flex-start',
                            maxWidth: isTeacher ? 'none' : '520px',
                            width: '100%'
                        }}
                    >
                        { !isTeacher && <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px'
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: darkGrey,
                                    fontWeight: 500,
                                    maxWidth: '200px',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden'
                                }}
                            >
                                {fileToSend?.name}
                            </Typography>
                            <form
                                style={{
                                    width: '100%',
                                    maxWidth: '312px'
                                }}
                                encType="multipart/form-data"
                                action=""
                            >
                                <label
                                    style={{
                                        width: '100%',
                                    }}
                                    htmlFor={`add-file-input-course-${id}`}
                                >
                                    <input
                                        id={`add-file-input-course-${id}`}
                                        type="file"
                                        name="image"
                                        multiple
                                        style={{
                                            display: 'none'
                                        }}
                                        onChange={(event) => {
                                            setFileToSend(event.target.files[0]);
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
                                            width: '100%',
                                            padding: '10px 22px',
                                            fontWeight: 500,
                                            textAlign: 'center',
                                            transition: 'background-color 100ms linear',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            borderRadius: '100px',
                                            maxWidth: '312px',
                                            '&:hover': {
                                                backgroundColor: grey[300],
                                                boxShadow: 'none',
                                                cursor: 'pointer',
                                            }
                                        }}
                                    >
                                        + Add file
                                    </Box>
                                </label>
                            </form>
                        </Box>}

                        { (isTeacher && !task.submissions.length) &&
                            <Typography
                                variant="body1"
                                sx={{
                                    color: darkGrey,
                                    fontWeight: 500,
                                    fontSize: 18,
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden'
                                }}
                            >
                                Can not grade. No submissions yet
                            </Typography>
                        }

                        { isTeacher && task.submissions.length > 0 &&
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={handleFail}
                                    sx={{
                                        color: 'white',
                                        background: red[700],
                                        boxShadow: 'none',
                                        textTransform: 'none',
                                        borderRadius: '100px',
                                        '&.MuiButton-root:hover': {
                                            bgcolor: red[600],
                                            boxShadow: 'none'
                                        }
                                    }}
                                >
                                    Fail
                                </Button>

                                <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={handleOpen}
                                    sx={{
                                        color: 'white',
                                        background: grey[900],
                                        boxShadow: 'none',
                                        textTransform: 'none',
                                        borderRadius: '100px',
                                        '&.MuiButton-root:hover': {
                                            bgcolor: grey[800],
                                            boxShadow: 'none'
                                        }
                                    }}
                                >
                                    Grade
                                </Button>
                            </Box>
                        }

                        { !isTeacher &&
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleSendSubmission}
                                sx={{
                                    margin: '16px 0 0',
                                    color: 'white',
                                    background: grey[900],
                                    boxShadow: 'none',
                                    textTransform: 'none',
                                    borderRadius: '100px',
                                    '&.MuiButton-root:hover': {
                                        bgcolor: grey[800],
                                        boxShadow: 'none'
                                    }
                                }}
                            >
                                Send
                            </Button>
                        }
                    </Box>
                </Box>

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
                                Grade student work
                            </Typography>

                            <TextField
                                variant="filled"
                                margin="normal"
                                label="Grade"
                                type="number"
                                fullWidth
                                sx={{
                                    marginTop: 3,
                                }}
                                value={grade}
                                onChange={(e) => setGrade(+e.target.value)}
                            />

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleGrade}
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
                                Grade
                            </Button>
                        </Box>
                    </>
                </Modal>
            </AccordionDetails>
        </Accordion>
    );
}
