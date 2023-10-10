import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreatAssignment from "../src/components/CreateAssignment/CreatAssignment";

export default function Test() {
    return (
        <Box sx={{ flexGrow: 1 }} p={2}>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }} variant="h4">My Courses</Typography>
            <CreatAssignment />
        </Box>
    );
}
