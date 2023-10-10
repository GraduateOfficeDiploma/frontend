'use client'
import * as React from 'react';
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, Menu, MenuItem, Modal, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from "@mui/material/Grid";

export default function CreatAssignment() {
    const [open, setOpen] = React.useState(false);
    const [assignmentTitle, setAssignmentTitle] = React.useState('');
    const [assignmentDescription, setAssignmentDescription] = React.useState('');
    const [date, setDate] = React.useState(dayjs('2023-01-01'));
    const [permission, setPermission] = React.useState('all')
    const [grade, setGrade] = React.useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        handleOpen();

        setAnchorEl(null);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleChangePermission = (event) => {
        setPermission(event.target.value);
    };

    const handleChangeGrade = (event) => {
        setGrade(event.target.value);
    };

    const darkGrey = '#373737';
    const textColor = "#6E6E6E";

    return (
        <Box>
            <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleClick}
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
                + Create
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleCloseMenu}>Assignment</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Quiz assignment</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Material</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Topic</MenuItem>
            </Menu>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    p={5}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '520px',
                        bgcolor: 'white'
                    }}
                >
                    <Typography sx={{fontWeight: 500, lineHeigth: '28px'}} variant="h5">
                        Create assignment
                    </Typography>

                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Title"
                        type="text"
                        fullWidth
                        sx={{
                            marginTop: 3
                        }}
                        value={assignmentTitle}
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                    />

                    <TextField
                        variant="filled"
                        margin="normal"
                        label="Instructions (optional)"
                        type="text"
                        multiline
                        rows={5}
                        fullWidth
                        sx={{
                            marginTop: 3
                        }}
                        value={assignmentDescription}
                        onChange={(e) => setAssignmentDescription(e.target.value)}
                    />

                    <Box
                        p={2}
                        sx={{
                            marginTop: 3,
                            border: `1px solid ${grey[200]}`,
                            borderRadius: '4px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: 2
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        color: darkGrey,
                                        fontWeight: 500,
                                        lineHeight: '20px'
                                    }}
                                    variant="body1"
                                >
                                    1.png
                                </Typography>
                                <Typography sx={{ color: textColor, lineHeight: '20px' }}variant="body1">Image</Typography>
                            </Box>
                            <Button>Remove</Button>
                        </Box>

                        <FormControl variant="filled" sx={{ marginTop: 2, maxWidth: '250px', width: '100%' }}>
                            <InputLabel id="select-permission-label">Permission</InputLabel>
                            <Select
                                labelId="select-permission-label"
                                id="select-permission"
                                value={permission}
                                onChange={handleChangePermission}
                                label="Permision"
                            >
                                <MenuItem value="all">Everyone can view file</MenuItem>
                                <MenuItem value="students_view">Students can view file</MenuItem>
                                <MenuItem value="teachers_view">Teachers can view file</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box
                        p={2}
                        sx={{
                            marginTop: 3,
                            border: `1px solid ${grey[200]}`,
                            borderRadius: '4px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: darkGrey,
                                fontWeight: 500,
                                lineHeight: '20px'
                            }}
                            variant="body1"
                        >
                            Attach
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                gap: 1,
                                marginTop: 2
                            }}
                        >
                            <Button>Drive</Button>
                            <Button>YouTube</Button>
                            <Button>Create</Button>
                            <Button>Upload</Button>
                            <Button>Link</Button>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 2,
                            marginTop: 3
                        }}
                    >
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                alignItems: 'center'
                            }}
                        >
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Schedule"
                                        value={date}
                                        sx={{
                                            "&.MuiTextField-root": {
                                                width: '100%'
                                            }
                                        }}
                                        onChange={(newValue) => setDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl sx={{width: '100%', marginTop: 1}} variant="outlined">
                                    <InputLabel id="select-grade-label">Grade</InputLabel>
                                    <Select
                                        labelId="select-grade-label"
                                        id="select-grade"
                                        value={grade}
                                        onChange={handleChangeGrade}
                                        label="Grade"
                                    >
                                        <MenuItem value="all">Ungraded</MenuItem>
                                        <MenuItem value="students_view">Graded</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>


                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleClose}
                        sx={{
                            color: 'white',
                            background: grey[900],
                            boxShadow: 'none',
                            borderRadius: '100px',
                            marginTop: 3,
                            '&.MuiButton-root:hover': {
                                bgcolor: grey[800],
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Assign
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
