import * as React from 'react';
import {Paper, Typography, Box, Chip} from '@mui/material';
import ContactsIcon from '@mui/icons-material/AccountCircle';
import {useRecordContext, EditButton, ShowButton} from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import CheckIcon from '@mui/icons-material/Check';
import NoteIcon from '@mui/icons-material/Note';
import {useState} from "react";

export const SubjectCard = (props) => {
    const [elevation, setElevation] = useState(1);
    const record = useRecordContext(props);
    if (!record) return null;

    return (
            <Paper
                sx={{
                    height: 200,
                    width: 195,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1em',
                }}
                onMouseEnter={() => setElevation(3)}
                onMouseLeave={() => setElevation(1)}
                elevation={elevation}
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <BookIcon fontSize='large'/>
                    <Box textAlign="center" marginTop={1}>
                        <div style={{paddingTop: 10}}>
                            <Chip label={record.name} style={{ fontSize: 'large'}}/>
                        </div>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-around" width="100%">
                    <Box display="flex" alignItems="center">
                        <NoteIcon sx={{ mr: 1 }} />
                        <div>
                            <Typography variant="subtitle2" sx={{ mb: -1 }}>
                                {record.homeworks.length}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Homeworks
                            </Typography>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckIcon sx={{ mr: 1 }} />
                        <div>
                            <Typography variant="subtitle2" sx={{ mb: -1 }}>
                                {record.absences.length}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Absences
                            </Typography>
                        </div>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <EditButton/>
                    <ShowButton/>
                </Box>
            </Paper>
    );
};