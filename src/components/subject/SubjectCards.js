import { useListContext, RecordContextProvider} from "react-admin";
import {Box} from "@mui/material";
import {SubjectCard} from "./SubjectCard";

const SubjectCards = () => {
    const { data, isLoading } = useListContext();
    if (isLoading) return null;

    return (
        <Box display="flex" flexWrap="wrap" justifyContent='center' width="100%" gap={5} paddingTop={2} paddingBottom={2}>
            {data.map(record => (
                <RecordContextProvider key={record.id} value={record}>
                    <SubjectCard/>
                </RecordContextProvider>
            ))}
        </Box>
    );
};

export default SubjectCards