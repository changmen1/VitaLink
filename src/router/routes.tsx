import { RouteObject } from 'react-router-dom';
import Home from '@/pages/home';
import About from '@/pages/about';
// import NotFound from '@/pages/NotFound';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/about',
        element: <About />,
    },
    // {
    //     path: '*',
    //     element: <NotFound />,
    // },
];

export default routes;
