'use client'
import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import Course from "../../src/components/Course/Course";
import { useRouter } from 'next/router'
import PersonCard from "../../src/components/PersonCard/PersonCard";
import CreatAssignment from "../../src/components/CreateAssignment/CreatAssignment";

export default function CoursePage() {
    const router = useRouter();
    const [topics, setTopics] = React.useState('all');

    const handleChangeYear = (event) => {
        setTopics(event.target.value);
    };

    return (
        <Box sx={{flexGrow: 1}} p={2}>
            <Typography sx={{fontWeight: 500}} variant="h4">English language</Typography>

            {/*<FormControl variant="filled" sx={{margin: '32px 0 40px', width: '240px'}}>*/}
            {/*    <InputLabel id="demo-simple-select-standard-label">Topics</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="demo-simple-select-standard-label"*/}
            {/*        id="demo-simple-select-standard"*/}
            {/*        value={topics}*/}
            {/*        onChange={handleChangeYear}*/}
            {/*        label="Person"*/}
            {/*    >*/}
            {/*        <MenuItem value="all">All topics</MenuItem>*/}
            {/*        <MenuItem value="case_studies">Case studies</MenuItem>*/}
            {/*        <MenuItem value="topic2">Topic 2</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}

            <Box
                sx={{
                    margin: '16px 0 40px'
                }}
            >
                <CreatAssignment courseId={router.query.course} />
            </Box>


            <Box
                sx={{
                    marginBottom: 4
                }}
            >
                <Typography sx={{fontWeight: 500, marginBottom: 2}} variant="h5">Students</Typography>

                <PersonCard />
                <PersonCard />
                <PersonCard />
                <PersonCard />
            </Box>

            <Box>
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