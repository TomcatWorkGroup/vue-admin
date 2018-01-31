import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import echarts from './views/charts/echarts.vue'
import company from './views/nav1/company.vue'
import enterprise from './views/nav1/enterprise.vue'
import customer from './views/nav1/customer.vue'
import enduser from './views/nav1/enduser.vue'
import employee from './views/nav2/employee.vue'
import device from './views/nav3/device.vue'
import manufacturer from './views/nav3/manufacturer.vue'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '组织管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/company', component: company, name: '公司' },            
            { path: '/enterprise', component: enterprise, name: '企业' },
            { path: '/customer', component: customer, name: '客户' },
            { path: '/enduser', component: enduser, name: '终端用户' },           
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设备管理',
        iconCls: 'fa fa-dashboard',
        children: [
            { path: '/manufacturer', component: manufacturer, name: '厂商' },   
            { path: '/device', component: device, name: '控制器' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-group',//图标样式class
        leaf:true,
        children: [
            { path: '/employee', component: employee, name: '员工管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;