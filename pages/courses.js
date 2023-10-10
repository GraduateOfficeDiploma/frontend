import * as React from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CourseCard from "../src/components/CourseCard/CourseCard";
import AddCourse from "../src/components/AddCourse/AddCourse";
import CreateCourse from "../src/components/CreateCourse/CreateCourse";
import CreatAssignment from "../src/components/CreateAssignment/CreatAssignment";

export default function Courses() {
    return (
        <Box sx={{ flexGrow: 1 }} p={2}>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }} variant="h4">My Courses</Typography>
            <Grid container spacing={2}>
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <AddCourse />
            </Grid>
        </Box>
    );
}
