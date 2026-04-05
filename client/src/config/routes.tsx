import { Navigate, type RouteObject } from 'react-router';
import App from '../App';
import ProductsPage from 'App/pages/ProductsPage';
import ProductPage from 'App/pages/ProductPage';
import ProductEditPage from 'App/pages/ProductEditPage';

export const routes = {
    main: {
        mask: "/",
        create: () => "/",
    },
    products: {
        mask: "/ads",
        create: () => "/ads",
    },
    product: {
        mask: "/ads/:id",
        create: (id: string) => `/ads/${id}`
    },
    productEdit: {
        mask: "/ads/:id/edit",
        create: (id: string) => `/ads/${id}/edit`
    }
}

export const routesConfig: RouteObject[] = [
    {
        path: routes.main.mask,
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to={routes.products.mask} replace />
            },
            {
                path: routes.products.mask,
                element: <ProductsPage />
            },
            {
                path: routes.product.mask,
                element: <ProductPage />
            },
            {
                path: routes.productEdit.mask,
                element: <ProductEditPage />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to={routes.main.mask} replace />
    }
];
