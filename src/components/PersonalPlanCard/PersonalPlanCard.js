'use client'
import * as React from 'react';
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SendIcon from '@mui/icons-material/Send';
import {useSession} from "next-auth/react";
import dayjs from "dayjs";
import Link from "next/link";
import {useEffect} from "react";

export default function PersonalPlanCard({task, setProgress}) {
    const textColor = "#6E6E6E";
    const darkGrey = '#373737';
    const session = useSession();

    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([
        {
            fullName: 'Name Surname',
            role: 'Teacher',
            message: 'I hope this message finds you well. I would like to discuss the crucial process of selecting' +
                ' a dissertation topic and obtaining its approval. This stage marks the beginning of your dissertation' +
                ' journey and is a critical foundation for your academic work.'
        },
        {
            fullName: 'Name Surname',
            role: 'Teacher',
            message: 'Choosing the right topic is a crucial step in your academic journey,' +
                ' and I\'m here to assist you in making an informed decision.'
        }
    ]);
    const [fileToSend, setFileToSend] = React.useState(null);
    const [isTeacher, setIsTeacher] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated') {
            setIsTeacher(session?.data?.user?.role === 'teacher');
        }
    }, [session]);

    const handleSendMessage = () => {
        const newMessage = {
            fullName: session.data.user.name,
            role: session.data.user.role,
            message: message
        }

        setMessages(prev => ([...prev, newMessage]));
        setMessage('');
    }

    const handleAccept = () => {
        setProgress(prev => prev + 10);
        setIsAccepted(true);
    }

    const handleDecline = () => {
        setProgress(prev => prev - 10);
        setIsAccepted(false);
    }

    return (
        <Accordion
            sx={{
                bgcolor: grey[200],
                border: `1px solid ${grey[400]}`,
                borderRadius: '8px !important',
                boxShadow: 'none',
                margin: '0px !important',
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
                        <Typography sx={{fontWeight: 400, lineHeight: '24px'}} variant="h6">
                            {task.title}
                        </Typography>
                    </Box>
                    <Typography variant="body1">
                        Not passed
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

                { task.description &&
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 1,
                            }}
                        >
                            <Typography m={0} sx={{fontWeight: 500}} variant="h6">
                                Description
                            </Typography>
                            <Typography sx={{fontWeight: 400}} variant="body1">
                                {task.description}
                            </Typography>
                        </Box>

                        <Divider sx={{margin: '16px 0'}} />
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

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '8px'
                    }}
                >
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
                            <CalendarMonthIcon/>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: textColor
                                }}
                            >
                                Due date: {dayjs(task?.dueDate).format('DD.MM.YYYY')}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: textColor
                            }}
                        >
                            Scientific supervisor: Approved
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: textColor
                            }}
                        >
                            Scientific secretary: Reject
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: '520px',
                            width: '100%'
                        }}
                    >
                        <Box
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
                                { fileToSend?.name }
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
                                    htmlFor="file-input-personal-plan"
                                >
                                    <input
                                        id="file-input-personal-plan"
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
                        </Box>
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
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'white',
                        marginTop: 2
                    }}
                    p={2}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 500
                        }}
                    >
                        Private comments:
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 2,
                            gap: 2,
                            maxHeight: '400px',
                            overflow: 'auto',
                            paddingRight: 2
                        }}
                    >
                        { messages.map(item => {
                            return(
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: '12px'
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            width: '100%'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%',
                                                margin: '5px 0'
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontSize: '17px',
                                                    fontWeight: 500,
                                                    lineHeight: '22px'
                                                }}
                                            >
                                                { item.fullName }
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    lineHeight: '20px',
                                                    fontStyle: 'italic',
                                                    color: darkGrey
                                                }}
                                            >
                                                { item.role }
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                lineHeight: '20px',
                                                marginTop: '4px',
                                                color: textColor
                                            }}
                                        >
                                            { item.message }
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    <TextField
                        variant="outlined"
                        type="text"
                        size="small"
                        fullWidth
                        placeholder="Write a message:"
                        value={message}
                        sx={{
                            marginTop: 2
                        }}
                        InputProps={{
                            endAdornment:
                                <Button
                                    onClick={handleSendMessage}
                                    sx={{
                                        padding: 0,
                                        marginLeft: 1,
                                        minWidth: 0,
                                        color: darkGrey,
                                        '&.MuiButton-root:hover': {
                                            bgcolor: 'transparent',
                                        },
                                        '&& .MuiTouchRipple-child': {
                                            bgcolor: 'transparent'
                                        }
                                    }}
                                >
                                    <SendIcon />
                                </Button>,
                        }}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                </Box>

                { isTeacher &&
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={isAccepted ? handleDecline : handleAccept}
                        sx={{
                            margin: '16px 0 0',
                            color: 'white',
                            background: isAccepted ? grey[700] : grey[900],
                            boxShadow: 'none',
                            textTransform: 'none',
                            borderRadius: '100px',
                            maxWidth: '400px',
                            '&.MuiButton-root:hover': {
                                bgcolor: isAccepted ? grey[600] : grey[800],
                                boxShadow: 'none'
                            }
                        }}
                    >
                        { isAccepted ? 'Cancel' : 'Accept' }
                    </Button>
                }
            </AccordionDetails>
        </Accordion>
    );
}
