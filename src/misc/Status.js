import * as React from 'react';
import { Box } from '@mui/material';

const getColorFromStatus = (status) =>
    status === true
        ? '#038d06'
        : '#fc0606'

export const Status = ({ status }) => (
    <Box
        marginLeft={0.5}
        width={10}
        height={10}
        display="inline-block"
        borderRadius="5px"
        bgcolor={getColorFromStatus(status)}
        component="span"
    />
);