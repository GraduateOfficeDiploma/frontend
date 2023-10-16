'use client'
import * as React from 'react';
import {grey} from '@mui/material/colors';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {FormControl, IconButton, InputLabel, Menu, MenuItem, Modal, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {useSession} from "next-auth/react";

export default function CreatAssignment(props) {
    const [openModal, setOpenModal] = React.useState('');
    const [openTopicModal, setOpenTopicModal] = React.useState(false);
    const [assignmentTitle, setAssignmentTitle] = React.useState('');
    const [topic, setTopic] = React.useState('');
    const [assignmentDescription, setAssignmentDescription] = React.useState('');
    const [date, setDate] = React.useState(dayjs());
    // const [permission, setPermission] = React.useState('all')
    const [files, setFiles] = React.useState([]);
    const [selectedTopic, setSelectedTopic] = React.useState('assignments')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [year, setYear] = React.useState(1);
    const openMenu = Boolean(anchorEl);
    const {courseId, isStudentsPersonalPlan} = props;
    const session = useSession();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = (modal) => {
        if (modal) {
            handleOpenModal(modal);
        }

        setAnchorEl(null);
    };

    const handleOpenModal = (modal) => setOpenModal(modal);

    const handleCloseModal = () => setOpenModal('');

    // const handleChangePermission = (event) => {
    //     setPermission(event.target.value);
    // };

    const handleChangeGrade = (event) => {
        setSelectedTopic(event.target.value);
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    }

    const handleAddFiles = (file) => {
        console.log('kuku', file)

        if (!files.find(item => item.name === file.name)) {
            setFiles([...files, file]);
        }
    }

    const handleRemoveFile = (name) => {
        setFiles(prev => prev.filter((prevFile) => prevFile.name !== name));
    }

    const handleCreateAssignment = () => {
        const fd = new FormData();

        files.forEach(file => {
            fd.append('attachments', file);
        })

        fd.append('title', assignmentTitle);

        if (assignmentDescription) {
            fd.append('description', assignmentDescription);
        }

        fd.append('dueDate', date);
        fd.append('courseId', courseId);

        axios.post(`${process.env.BACKEND_URL}/api/tasks`, fd, {
            headers: {
                Authorization: `Bearer ${session.data.user.accessToken}`
            }
        })
            .then(function (response) {
                // setAlertVisibility({visible: true, type: 'success', message: 'Assignment created successfully'});

                console.log('kuku success', response);

                handleCloseModal();
            })
            .catch(function (error) {
                console.log('kuku error', error);

                // setAlertVisibility({visible: true, type: 'error', message: 'Error creating assignment'});
            });
    }

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
                    lineHeight: '22px',
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
                <MenuItem sx={{width: '312px', fontWeight: 500}}
                          onClick={() => handleCloseMenu('assignment')}>Assignment</MenuItem>
                {/*<MenuItem onClick={() => handleCloseMenu('2')}>Quiz assignment</MenuItem>*/}
                {/*<MenuItem onClick={() => handleCloseMenu('3')}>Material</MenuItem>*/}
                {/*<MenuItem sx={{ width: '312px', fontWeight: 500 }} onClick={() => handleCloseMenu('topic')}>Topic</MenuItem>*/}
            </Menu>

            <Modal
                open={openModal === 'assignment'}
                onClose={handleCloseModal}
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

                    {files.map(file => {
                        return (
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
                                            {file.name}
                                        </Typography>
                                        <Typography sx={{color: textColor, lineHeight: '20px'}} variant="body1">
                                            {file.type}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        onClick={() => handleRemoveFile(file.name)}
                                    >
                                        <CloseIcon
                                            sx={{
                                                color: 'black'
                                            }}
                                        />
                                    </IconButton>
                                </Box>

                                {/*<FormControl variant="filled" sx={{ marginTop: 2, maxWidth: '250px', width: '100%' }}>*/}
                                {/*    <InputLabel id="select-permission-label">Permission</InputLabel>*/}
                                {/*    <Select*/}
                                {/*        labelId="select-permission-label"*/}
                                {/*        id="select-permission"*/}
                                {/*        value={permission}*/}
                                {/*        onChange={handleChangePermission}*/}
                                {/*        label="Permision"*/}
                                {/*    >*/}
                                {/*        <MenuItem value="all">Everyone can view file</MenuItem>*/}
                                {/*        <MenuItem value="students_view">Students can view file</MenuItem>*/}
                                {/*        <MenuItem value="teachers_view">Teachers can view file</MenuItem>*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}
                            </Box>
                        );
                    })}


                    <form
                        style={{
                            width: '100%',
                            marginTop: 24
                        }}
                        encType="multipart/form-data"
                        action=""
                    >
                        <label
                            style={{
                                width: '100%',
                            }}
                            htmlFor="add-file-input"
                        >
                            <input
                                id="add-file-input"
                                type="file"
                                name="image"
                                multiple
                                style={{
                                    display: 'none'
                                }}
                                onChange={(event) => {
                                    handleAddFiles(event.target.files[0]);
                                }}
                            />
                            <Box
                                variant="contained"
                                size="large"
                                fullWidth
                                htmlFor="file-input"
                                sx={{
                                    color: darkGrey,
                                    background: 'transparent',
                                    boxShadow: 'none',
                                    border: `1px solid ${grey[400]}`,
                                    textTransform: 'none',
                                    borderRadius: '100px',
                                    width: '100%',
                                    padding: '10px 22px',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                    transition: 'background-color 100ms linear',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    '&:hover': {
                                        backgroundColor: grey[300],
                                        boxShadow: 'none',
                                        cursor: 'pointer',
                                    }
                                }}
                            >
                                + Add file
                            </Box>
                        </label>
                    </form>

                    {/*<Box*/}
                    {/*    p={2}*/}
                    {/*    sx={{*/}
                    {/*        marginTop: 3,*/}
                    {/*        border: `1px solid ${grey[200]}`,*/}
                    {/*        borderRadius: '4px',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*<Typography*/}
                    {/*    sx={{*/}
                    {/*        color: darkGrey,*/}
                    {/*        fontWeight: 500,*/}
                    {/*        lineHeight: '20px'*/}
                    {/*    }}*/}
                    {/*    variant="body1"*/}
                    {/*>*/}
                    {/*    Attach*/}
                    {/*</Typography>*/}
                    {/*<Box*/}
                    {/*    sx={{*/}
                    {/*        display: 'flex',*/}
                    {/*        justifyContent: 'space-around',*/}
                    {/*        gap: 1,*/}
                    {/*        marginTop: 2*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Button>Drive</Button>*/}
                    {/*    <Button>YouTube</Button>*/}
                    {/*    <Button>Create</Button>*/}
                    {/*    <Button>Upload</Button>*/}
                    {/*    <Button>Link</Button>*/}
                    {/*</Box>*/}
                    {/*</Box>*/}

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
                                        label="Due to date"
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

                            {isStudentsPersonalPlan ?
                                <Grid item xs={6}>
                                    <FormControl sx={{width: '100%'}} variant="outlined">
                                        <InputLabel id="select-year-label">Year</InputLabel>
                                        <Select
                                            labelId="select-year-label"
                                            id="select-year"
                                            value={year}
                                            onChange={handleChangeYear}
                                            label="Year"
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                :
                                <Grid item xs={6}>
                                    <FormControl sx={{width: '100%'}} variant="outlined">
                                        <InputLabel id="select-grade-label">Topics</InputLabel>
                                        <Select
                                            labelId="select-grade-label"
                                            id="select-grade"
                                            value={selectedTopic}
                                            onChange={handleChangeGrade}
                                            label="Topics"
                                        >
                                            <MenuItem value="assignments">Assignments</MenuItem>
                                            <MenuItem value="other">Other topic</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            }


                        </Grid>
                    </Box>


                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleCreateAssignment}
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

            <Modal
                open={openModal === 'topic'}
                onClose={handleCloseModal}
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
                        Create topic
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
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleCloseModal}
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
                        Create topic
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
