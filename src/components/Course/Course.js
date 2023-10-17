'use client'
import * as React from 'react';
import {green, grey, red} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Link from "next/link";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import dayjs from "dayjs";
import {useSession} from "next-auth/react";

export default function Course({task, taskId, isTeacher}) {
    const textColor = "#6E6E6E";
    const darkGrey = '#373737';

    const [message, setMessage] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [fileToSend, setFileToSend] = React.useState(null);

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
                        Not graded
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    padding: '0 16px 16px'
                }}
            >

                <Divider
                    sx={{
                        marginBottom: 2
                    }}
                />

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

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: 2
                    }}
                >
                    <Link
                        href="#"
                        style={{
                            display: "flex",
                            textDecoration: 'none',
                            width: '100%',
                            border: `1px solid ${grey[400]}`,
                            borderRadius: '8px'
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
                                    color: 'black'
                                }}
                            >
                                Lesson 12. Case studies
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: darkGrey
                                }}
                            >
                                PDF
                            </Typography>
                        </Box>
                    </Link>
                    <Link
                        href="#"
                        style={{
                            display: "flex",
                            textDecoration: 'none',
                            width: '100%',
                            border: `1px solid ${grey[400]}`,
                            borderRadius: '8px'
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
                                    color: 'black'
                                }}
                            >
                                Lesson 12. Case studies
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: darkGrey
                                }}
                            >
                                PDF
                            </Typography>
                        </Box>
                    </Link>
                </Box>

                <Divider
                    sx={{
                        marginBottom: 2
                    }}
                />
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
                                    Posted: Date
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
                                    Grade: Grade
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
                                    htmlFor="add-file-input-course"
                                >
                                    <input
                                        id="add-file-input-course"
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

                        { isTeacher ?
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
                                    sx={{
                                        color: 'white',
                                        background: green[700],
                                        boxShadow: 'none',
                                        textTransform: 'none',
                                        borderRadius: '100px',
                                        '&.MuiButton-root:hover': {
                                            bgcolor: green[600],
                                            boxShadow: 'none'
                                        }
                                    }}
                                >
                                    Pass
                                </Button>
                            </Box>
                            :
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
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
            </AccordionDetails>
        </Accordion>
    );
}
