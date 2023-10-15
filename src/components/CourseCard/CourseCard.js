'use client'
import * as React from 'react';
import Grid from "@mui/material/Grid";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import {Avatar} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from "dayjs";
import {useEffect} from "react";

export default function CourseCard({course}) {
    const [courseSchedule, setCourseSchedule] = React.useState('');
    const textColor = "#6E6E6E";
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const scheduleDays = [];

        course.schedule.forEach(date => {
            const day = weekDays[dayjs(date).day()];

            if (!scheduleDays.includes(day)) {
                scheduleDays.push(day);
            }
        })

        setCourseSchedule(scheduleDays.join(', '));
    }, [course]);
    
    return (
        <Grid
            item
            xs={6}
            md={4}
        >
            <Button
                fullWidth
                href={`/course/${course.id}`}
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
                {course.imageUrl ?
                    <Avatar
                        sx={{bgcolor: grey[400], border: `1px solid ${grey[400]}`, width: 52, height: 52}}
                        variant="rounded"
                        src={course.imageUrl}
                    />
                    :
                    <Box
                        sx={{
                            width: 52,
                            height: 52,
                            bgcolor: grey[300],
                            border: `1px solid ${grey[400]}`,
                            borderRadius: '4px'
                        }}
                    />
                }

                <Typography
                    sx={{
                        fontSize: 22,
                        lineHeight: '26px',
                        fontWeight: 500,
                        margin: "16px 0 0"
                    }}
                    variant="h6"
                >
                    {course.name}
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
                        {course.createdBy.fullName}
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
                        {courseSchedule}
                    </Typography>
                </Box>
            </Button>
        </Grid>
    );
}
