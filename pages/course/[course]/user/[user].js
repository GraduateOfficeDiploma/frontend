'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Course from "../../../../src/components/Course/Course";

export default function UserCoursePage() {
    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2
                }}
            >
                <Typography sx={{fontWeight: 500}} variant="h4">English language, Student name</Typography>
            </Box>

            <Box
                sx={{
                    marginTop: 5
                }}
            >
                <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">Assignments</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Course />
                    <Course />
                </Box>
            </Box>
        </Box>
    );
}