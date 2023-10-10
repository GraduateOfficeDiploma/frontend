import * as React from 'react';
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';

export default function TaskCard() {
    const textColor = "#6E6E6E";

    return (
        <Box
            p={2}
            sx={{
                bgcolor: grey[200],
                border: `1px solid ${grey[400]}`,
                borderRadius: '8px'
            }}
        >
            <Typography sx={{ontWeight: 500, marginBottom: 2}} variant="h6">Homework
                words</Typography>
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
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '4px'
                        }}
                    >
                        <SchoolIcon/>
                        <Typography sx={{color: textColor}} variant="body1">Course:</Typography>
                    </Box>
                    <Typography variant="body1">Course name</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '4px'
                        }}
                    >
                        <CalendarTodayIcon/>
                        <Typography sx={{color: textColor}} variant="body1">Posted:</Typography>
                    </Box>
                    <Typography variant="body1">Day, Month day, Year</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '4px'
                        }}
                    >
                        <CalendarTodayIcon/>
                        <Typography sx={{color: textColor}} variant="body1">Due date:</Typography>
                    </Box>
                    <Typography variant="body1">Day, Month day, Year</Typography>
                </Box>
            </Box>
        </Box>
    );
}
