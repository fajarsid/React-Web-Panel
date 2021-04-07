import Login from '../components//Login';
import Register from '../components/Register';
import Validasi from '../components/HomePage/valdasi';
import Dashboard from '../components/Dashboard';
import RsCalon from '../components/Register/calon';
import RsUser from '../components/Register/user';
import ChartVote from '../components/List/charVote';
import ListData from '../components/List/listData';
import UploadImage from '../components/Register/upload';

import {
    DashboardMaster,
    ListCalon,
    EditCalon,
    ListUser,
    EditUser
} from '../components/Master';


export const CredentialRoutes = [
    {
        path: '/',
        exact: true,
        label: 'Login',
        component: Login
    }
]

export const AdminRoutes = [
    {
        path: '/dashboard',
        exact: true,
        label: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/valdasi',
        exact: true,
        label: 'Validasi',
        component: Validasi
    },
    {
        path: '/calon',
        exact: true,
        label: 'Calon',
        component: RsCalon
    },
    {
        path: '/upload',
        exact: true,
        label: 'Upload',
        component: UploadImage
    },
    {
        path: '/user',
        exact: true,
        label: 'User',
        component: RsUser
    },
    {
        path: '/listdata',
        exact: true,
        label: 'List Data',
        component: ListData
    },
    {
        path: '/vote',
        exact: true,
        label: 'Vote',
        component: ChartVote
    },
]

export const MasterRoutes = [
    {
        path: '/master/dashboard',
        exact: true,
        label: 'Master Dahboard',
        component: DashboardMaster
    },
    {
        path: '/master/calon',
        exact: true,
        label: 'Master Data Calon',
        component: ListCalon
    },
    {
        path: '/master/calon/:id/edit',
        exact: true,
        label: 'Master Edit Calon',
        component: EditCalon
    },
    {
        path: '/master/user',
        exact: true,
        label: 'Master Data User',
        component: ListUser
    },
    {
        path: '/master/user/:id/edit',
        exact: true,
        label: 'Master Edit User',
        component: EditUser
    },
    {
        path: '/master/vote',
        exact: true,
        label: 'Vote',
        component: ListData
    },
    {
        path: '/master/listcalon',
        exact: true,
        label: 'Vote',
        component: ChartVote
    },
]
