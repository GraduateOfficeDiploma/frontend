import * as React from 'react';
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {Avatar} from "@mui/material";
import Button from "@mui/material/Button";

export default function PersonCard() {
    return (
        <Button
            fullWidth
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: 'black',
                textTransform: 'none',
                gap: 2,
                borderBottom: `1px solid ${grey[200]}`,
                padding: 1,
                '&.MuiButton-root:hover': {
                    bgcolor: grey[200],
                },
                '&.MuiButton-root:active': {
                    bgcolor: grey[300],
                }
            }}
        >
            <Avatar
                sx={{
                    width: 40,
                    height: 40
                }}
            />
            <Box>
                <Typography sx={{ fontWeight: 500 }} variant="body1">
                    Person name
                </Typography>
            </Box>
        </Button>
    );
}
