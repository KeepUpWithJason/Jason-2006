import Home from "../pages/Home"
const dynamicRoutes = [
    {
        path: "/",
        component:Home,
        children: []
    },
    {
        path:"*",
        component:()=> import("../pages/Page404")
    }
]

export default dynamicRoutes