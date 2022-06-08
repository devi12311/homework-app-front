import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import {useGetList, useNotify, AutocompleteInput} from "react-admin";
import {BASE_URL, SIGN_UP} from "./config";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {
    Autocomplete,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import TextField from "@mui/material/TextField";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                HomeworkUp
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function PricingContent() {
    const [ data, setData ] = useState([]);
    const [ subjects, setSubjects ] = useState([]);
    const [ subjectId, setSubjectId ] = useState(null);

    const notify = useNotify();

    useEffect(() => {

        getDashboardData();
            getSubjects();

    }, []);

    const createAbsence = (data) => {
        const accessToken = localStorage.getItem("accessToken");

        const request = new Request(`${BASE_URL}/absence`, {
            method: 'POST',
            body: JSON.stringify({
                subjectId: data.subjectId,
                date: data.date
            }),
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });

        return fetch(request).then(response => {
            if (response.status < 200 || response.status >= 300) {
                notify(response.message);
            }
            return response.json();
        }).then((data) => {
            notify(data.message);
            return Promise.resolve();
        }).catch((error) => {
            notify(error.message);
        });
    }

    const getDashboardData = () => {
        const accessToken = localStorage.getItem("accessToken");

        const request = new Request(`${BASE_URL}/dashboard`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return fetch(request).then(response => {
            if (response.status < 200 || response.status >= 300) {
                notify(response.message);
            }
            return response.json();
        }).then((data) => {
            setData(data)
            return Promise.resolve();
        }).catch((error) => {
            notify(error.message);
        });
    }

    const getSubjects = () => {
        const accessToken = localStorage.getItem("accessToken");

        const request = new Request(`${BASE_URL}/subject`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        return fetch(request).then(response => {
            if (response.status < 200 || response.status >= 300) {
                notify(response.message);
            }
            return response.json();
        }).then((data) => {
            const mapped = data.map((subject) => {
                return {
                    label: subject.name,
                    id: subject.id
                }
            })
            setSubjects(mapped)
            return Promise.resolve();
        }).catch((error) => {
            notify(error.message);
        });
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append('subject', subjectId.id);
        data.append('date', Date.now());
        createAbsence({
            subjectId: subjectId.id,
            date: Date.now()
        })
    };


    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Welcome !
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">

                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {data.map((record) => {
                      return   (
                          // Enterprise card is full width at sm breakpoint
                          <Grid
                              item
                              key={record.model}
                              xs={12}
                              sm={record.model === 'Enterprise' ? 12 : 6}
                              md={4}
                          >
                              <Card>
                                  <CardHeader
                                      title={record.model}
                                      titleTypographyProps={{ align: 'center' }}
                                      action={null}
                                      subheaderTypographyProps={{
                                          align: 'center',
                                      }}
                                      sx={{
                                          backgroundColor: (theme) =>
                                              theme.palette.mode === 'light'
                                                  ? theme.palette.grey[200]
                                                  : theme.palette.grey[700],
                                      }}
                                  />
                                  <CardContent>
                                      <Box
                                          sx={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'baseline',
                                              mb: 2,
                                          }}
                                      >
                                          <Typography component="h2" variant="h3" color="text.primary">
                                              {record.count}
                                          </Typography>
                                      </Box>
                                      <ul>
                                          {record.records.map((line) => (
                                              <Typography
                                                  component="li"
                                                  variant="subtitle1"
                                                  align="center"
                                                  key={line}
                                              >
                                                  {line}
                                              </Typography>
                                          ))}
                                      </ul>
                                  </CardContent>
                                  <CardActions>
                                      {record.model !== 'Absences' ?
                                          <></>
                                          :
                                          <Button
                                              fullWidth
                                              variant='contained'
                                              onClick={handleClickOpen}
                                          >
                                              Did you skip today?
                                          </Button>
                                      }
                                  </CardActions>
                              </Card>
                          </Grid>
                      )
                    })}
                </Grid>
                <div>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Keep track of your absences"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Fill in the form
                            </DialogContentText>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="subjectId"
                                            options={subjects}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params} label="Subject" />}
                                            onChange={(event, newValue) => {
                                                setSubjectId(newValue);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Box pt="1em" />
                                <Button sub={handleClose}>Discard</Button>
                                <Button  type='submit' onClick={handleClose}>Submit</Button>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </div>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
            >
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Pricing() {
    return <PricingContent />;
}
