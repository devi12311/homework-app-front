import {
    Datagrid,
    List,
    TextField,
    FunctionField,
    EditButton,
    SimpleForm,
    TextInput,
    DateInput, Create,
    Edit, AutocompleteInput, useGetList, BooleanInput
} from "react-admin";
import * as React from "react";
import {Status} from "../../misc/Status";

export const HomeworksList = props => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='id'/>
                <TextField source='title'/>
                <TextField source='description'/>
                <FunctionField label="Status" render={record => <Status status={record.status}/>} />
                <FunctionField label="Subject Name" render={record => `${record ? record.subject.name : ''}`}/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};

export const HomeworksCreate = props => {
    const { data, total, isLoading, error } = useGetList(
        'subject',
    );

    if (isLoading) return null;

    return (
        <Create title='Create Homework'>
            <SimpleForm>
                <TextInput source="title" />
                <TextInput source="description" />
                Status
                <BooleanInput source="status" />
                <AutocompleteInput source="subject" choices={data} />
                <DateInput source="startDate" />
                <DateInput source="endDate" />
            </SimpleForm>
        </Create>
    )
};

export const HomeworksEdit = props => {

    return (
        <Edit {...props} title='Edit Homework'>
            <SimpleForm>
                <TextInput source="title" />
                <TextInput source="description" />
                <BooleanInput source="status" />
                <DateInput source="startDate" />
                <DateInput source="endDate" />
            </SimpleForm>
        </Edit>
    )
};
