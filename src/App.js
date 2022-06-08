import * as React from 'react';
import PostIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import {Admin, Resource, fetchUtils, CustomRoutes} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import {SubjectList, SubjectCreate, SubjectShow, SubjectEdit} from './components/subject/subjects';
import PricingContent from './Dashboard';
import authProvider from './authProvider';
import {BASE_URL} from "./config";
import {
    HomeworksCreate,
    HomeworksEdit,
    HomeworksList,
} from "./components/homework/homeworks";
import {ExamCreate, ExamEdit, ExamMainList} from "./components/exam/exams";
import SignIn from "./components/login/LoginPage";
import {Route} from "react-router-dom";
import SignUp from "./components/login/RegisterPage";

const httpClient = (url, options = {}) => {
    const token = "Bearer " + localStorage.getItem("accessToken");
    options.user = {
        authenticated: true,
        token
    };
    return fetchUtils.fetchJson(url, options);
};

const CustomRoutesAdmin = async () => (
        <Route path="/register" element={<SignUp/>} />
)


const App = () => (
    <Admin
        dataProvider={jsonServerProvider(
            `${BASE_URL}`,
            httpClient
        )}
        loginPage={SignIn}
        authProvider={authProvider}
        dashboard={PricingContent}
    >
        <Resource
            name="subject"
            icon={PostIcon}
            list={SubjectList}
            edit={SubjectEdit}
            create={SubjectCreate}
            show={SubjectShow}
        />
        <Resource
            name="homework"
            icon={AssignmentIcon}
            list={HomeworksList}
            edit={HomeworksEdit}
            create={HomeworksCreate}
        />
        <Resource
            name="exam"
            icon={ArticleIcon}
            list={ExamMainList}
            edit={ExamEdit}
            create={ExamCreate}
        />
    </Admin>
);
export default App;
