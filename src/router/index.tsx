import { useRoutes } from 'react-router-dom';
import routes from './routes';

const AppRouter = () => {
    const element = useRoutes(routes);
    return element;
};

const RouterProvider = () => (
    // <HashRouter>
    <AppRouter />
    // </HashRouter>
);

export default RouterProvider;
