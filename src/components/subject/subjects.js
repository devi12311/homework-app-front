import * as React from 'react';
import {
    Show,
    SimpleShowLayout,
    DateField,
    List,
    Edit,
    Create,
    TextField,
    SimpleForm,
    TextInput,
    DateInput,
    useGetList,
    RecordContextProvider, FunctionField, EditButton, Datagrid

} from 'react-admin';

import SubjectCards from "./SubjectCards";
import {
    Box, Grid, ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack, Tab,
    Typography
} from "@mui/material";
import { useParams, Link as RouterLink} from 'react-router-dom';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import CheckIcon from '@mui/icons-material/Check';
import { Status } from '../../misc/Status'
import * as moment from 'moment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {ExamList} from "../exam/exams";

export const SubjectList = props => (
    <List {...props}>
        <SubjectCards/>
    </List>
);

const SubjectTitle = ({ record }) => {
    return <span>Subject {record ? `"${record.name}"` : ''}</span>;
};

export const SubjectEdit = props => {

    return (
        <Edit {...props} title={<SubjectTitle />}>
            <SimpleForm sx={{ maxWidth: 500 }}>
                <Typography variant="h6" gutterBottom>
                    Subject
                </Typography>
                <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="name" isRequired fullWidth />
                    </Box>
                </Box>
                <Stack direction='row' gap={6}>
                    <DateInput source="startDate" />
                    <DateInput source="endDate" />
                </Stack>
                <Box pt="1em" />
            </SimpleForm>
        </Edit>
    );
}

export const SubjectCreate = () => (
    <Create title='Create Subject'>
        <SimpleForm>
            <TextInput source="name" />
            <DateInput source="startDate" />
            <DateInput source="endDate" />
        </SimpleForm>
    </Create>
);

export const SubjectShow = props => {
    const { id } = useParams();
    const { data, total, isLoading, error } = useGetList(
        'subject/'+ id + '/homeworks',
    );

    if (isLoading) return null;

    return (
        <Show {...props} emptyWhileLoading>
        <Grid container spacing={2} sx={{margin: 2}}>
            <Grid item xs={12} sm={8}>
                <SimpleShowLayout>
                    <TextField label="Title" source="name"/>
                    <DateField label="Start Date" source="startDate"/>
                    <DateField label="End Date" source="endDate"/>
                </SimpleShowLayout>
            </Grid>
            <Grid item xs={12} sm={4}>
                <SimpleShowLayout>
                    <div style={{display: "flex", flexDirection:'column', alignItems: 'center', justifyContent: "space-around"}} >
                        <Box display="flex">
                            <CheckIcon sx={{ mr: 1 }} />
                            <div>
                                <Typography variant="subtitle1" sx={{ mb: -1 }}>
                                    Absences
                                </Typography>
                            </div>
                        </Box>
                        <TextField label='Absences' source='abesncesCount' style={{paddingTop: 10, fontSize: 'large'}}/>
                        <Box display="flex">
                            <AssignmentIcon sx={{ mr: 1 }} />
                            <div>
                                <Typography variant="subtitle1" sx={{ mb: -1 }}>
                                    Exams
                                </Typography>
                            </div>
                        </Box>
                        <TextField label='Exams' source='examsCount' style={{paddingTop: 10, fontSize: 'large'}}/>
                    </div>
                </SimpleShowLayout>
            </Grid>
        </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <List title={<span> </span>} pagination={false} hasCreate={false} exporter={false}>
                        {data.map(record => (
                            <RecordContextProvider key={record.id} value={record}>
                                <ListItem
                                    button
                                    component={RouterLink}
                                    to={`/homework/${record.id}`}
                                >
                                    <ListItemAvatar>
                                        {
                                            record.status ? <AssignmentTurnedInIcon/> : <AssignmentReturnedIcon/>
                                        }
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={record.title}
                                        secondary={
                                            <>
                                                {record.description}
                                            </>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="span"
                                        >
                                            {moment(record.endDate).diff(moment(moment()), 'days') + ' days left'
                                            } <Status status={record.status}/>
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </RecordContextProvider>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ExamList/>
                </Grid>
            </Grid>
    </Show>
    )
}
