import * as React from 'react';
import Grid from "@mui/material/Grid";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import {Avatar} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function CourseCard() {
    const textColor = "#6E6E6E";

    return (
        <Grid
            item
            xs={6}
            md={4}
        >
            <Button
                fullWidth
                href={'/course/courseName'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    bgcolor: grey[200],
                    borderRadius: '8px',
                    border: `1px solid ${grey[400]}`,
                    padding: 2,
                    height: '100%',
                    color: grey[900],
                    textTransform: 'none',
                    '&.MuiButton-root:hover': {
                        bgcolor: grey[300],
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
                <Avatar sx={{bgcolor: grey[400], border: `1px solid ${grey[400]}`, width: 52, height: 52}}
                        variant="rounded">
                    <PersonIcon/>
                </Avatar>
                <Typography
                    sx={{
                        fontSize: 22,
                        lineHeight: '26px',
                        fontWeight: 500,
                        margin: "16px 0 0"
                    }}
                    variant="h6"
                >
                    Course name
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: "20px 0 0",
                        gap: "4px"
                    }}
                >
                    <PersonIcon/>
                    <Typography
                        variant="body1"
                        sx={{
                            color: textColor
                        }}
                    >
                        Teacher name
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: "12px 0 0",
                        gap: "4px"
                    }}
                >
                    <CalendarTodayIcon/>
                    <Typography
                        variant="body1"
                        sx={{
                            color: textColor
                        }}
                    >
                        Course schedule
                    </Typography>
                </Box>
            </Button>
        </Grid>
    );
}
