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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Link from "next/link";
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Course() {
    const textColor = "#6E6E6E";
    const darkGrey = '#373737';

    const [message, setMessage] = React.useState('');

    return (
        <Accordion
            sx={{
                bgcolor: grey[200],
                border: `1px solid ${grey[400]}`,
                borderRadius: '8px !important',
                boxShadow: 'none'
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
                        margin: '6px 0'
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
                            Title
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
                            Preview
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
                            Preview
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
                                Due date: Date
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
                                    fontWeight: 500
                                }}
                            >
                                mytopic.pdf
                            </Typography>
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
                                + Add file
                            </Button>
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
            </AccordionDetails>
        </Accordion>
    );
}
