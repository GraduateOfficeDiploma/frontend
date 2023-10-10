import * as React from 'react';
import Grid from "@mui/material/Grid";
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

export default function AddCourse() {
    return (
        <Grid
            item
            xs={6}
            md={4}
        >
            <Button
                fullWidth
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    border: `1px dashed ${grey[400]}`,
                    padding: 2,
                    height: '100%',
                    textTransform: 'none',
                    color: grey[900],
                    '&.MuiButton-root:hover': {
                        bgcolor: grey[300],
                        border: `1px solid ${grey[400]}`
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
                <AddIcon sx={{ width: 48, height: 48 }} />
                <Typography
                    sx={{
                        fontSize: 22,
                        lineHeight: '26px',
                        fontWeight: 500,
                        margin: "8px 0 0"
                    }}
                    variant="h6"
                >
                    Join new course
                </Typography>
            </Button>
        </Grid>
    );
}
