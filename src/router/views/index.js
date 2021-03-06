import Layout from '@/page/index/'
export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '首页',
        meta: {
            i18n: 'dashboard'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/wel')
    }]
}, {
    path: '/test',
    component: Layout,
    redirect: '/test/index',
    children: [{
        path: 'index',
        name: '测试页',
        meta: {
            i18n: 'test'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/util/test')
    }]
}, {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
        path: 'index',
        name: '个人信息',
        meta: {
            i18n: 'info'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/user/info')
    }]
},{
    path: '/class/sign/',
    component: Layout,
    redirect: '/class/sign/recordsignin',
    children: [{
        path: 'recordsignin',
        name: '签到记录',
        meta: {
            i18n: 'signin'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/class/sign/recordsignin')
    }]
},{
    path: '/class/student/',
    component: Layout,
    redirect: '/class/student/stusend',
    children: [{
        path: 'stusend',
        name: '学生发送',
        meta: {
            i18n: 'stusend'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/class/student/stusend')
    }]
},{
    path: '/class/student/',
    component: Layout,
    redirect: '/class/student/stuback',
    children: [{
        path: 'stuback',
        name: '学生回传',
        meta: {
            i18n: 'stuback'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/class/student/stuback')
    }]
},{
    path: '/class/screen/',
    component: Layout,
    redirect: '/class/screen/video',
    children: [{
        path: 'video',
        name: '课堂录屏',
        meta: {
            i18n: 'video'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/class/screen/video')
    }]
},{
    path: '/class/send/',
    component: Layout,
    redirect: '/class/send/send',
    children: [{
        path: 'send',
        name: '教师下发',
        meta: {
            i18n: 'send'
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/class/send/send')
    }]
}]