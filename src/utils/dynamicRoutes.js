
const dynamicRoutes = [
    {
        path: "/",
        component:() => import("../pages/Home"),
        children: []
    },
    {
        path:"*",
        component:()=> import("../pages/Page404")
    }
]

export default dynamicRoutes