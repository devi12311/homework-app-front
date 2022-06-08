import {
    Datagrid,
    List,
    TextField,
    FunctionField,
    RecordContextProvider,
    SimpleForm,
    EditButton,
    DateInput, Create,
    Edit, AutocompleteInput, useGetList, BooleanInput, DateField, RecordContext, CreateButton
} from "react-admin";
import * as React from "react";
import {Status} from "../../misc/Status";
import {Link as RouterLink, useParams} from "react-router-dom";
import {ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import * as moment from "moment";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const ExamCreate = props => {
    const { data, total, isLoading, error } = useGetList(
        'subject',
    );

    if (isLoading) return null;

    return (
        <Create title='Create Homework'>
            <SimpleForm>
                <AutocompleteInput source="subjectId" choices={data}/>
                <AutocompleteInput source="grade" choices={
                    [
                        { id: 1, name: 'A' },
                        { id: 2, name: 'B' },                         
                        { id: 3, name: 'C' },
                        { id: 4, name: 'D' },
                    ]
                }  name='grade' optionValue='name'/>
                <DateInput source="startDate" />
                <DateInput source="endDate" />
            </SimpleForm>
        </Create>
    )
};

export const ExamEdit = props => {
    const { data, total, isLoading, error } = useGetList(
        'subject',
    );

    if (isLoading) return null;

    return (
        <Edit {...props} title='Edit Exam'>
            <SimpleForm>
                <AutocompleteInput source="subjectId" choices={data}/>
                <AutocompleteInput source="grade" choices={
                    [
                        { id: 1, name: 'A' },
                        { id: 2, name: 'B' },
                        { id: 3, name: 'C' },
                        { id: 4, name: 'D' },
                    ]
                }  name='grade' optionValue='name'/>
                <DateInput source="startDate" />
                <DateInput source="endDate" />
                <CreateButton/>
            </SimpleForm>
        </Edit>
    )
};

export const ExamList = props => {
    const { id } = useParams();
    const { data, total, isLoading, error } = useGetList(
        'exam/subject/' + id,
    );

    if (isLoading) return null;

    return (
            <List title={<span> </span>} pagination={false} hasCreate={false} exporter={false}>
                {data.map(record => (
                    <RecordContextProvider key={record.id} value={record}>
                        <ListItem
                            button
                            component={RouterLink}
                            to={`/exam/${record.id}`}
                        >
                            <ListItemAvatar>
                                <AssignmentIcon sx={{ mr: 1 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={'Exam  ' + record.id}
                                secondary={
                                    <>
                                        {'Grade  : ' +record.grade}
                                    </>
                                }
                            />
                        </ListItem>
                    </RecordContextProvider>
                ))}
            </List>

    )
}

export const ExamMainList = props => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='grade'/>
                <DateField source='endDate'/>
                <FunctionField label="Subject ID" render={record => `${record ? record.subjectId : ''}`}/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};