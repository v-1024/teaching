const login = ()=> import("views/login");
const register = ()=> import("views/register");
const teacher = ()=> import("views/teacher/teacher");
const teaching_work = ()=> import("views/teacher/t_work/teaching_work");  //教学运行
const researching_activity = ()=> import("views/teacher/researching_act/researching_activity");  //教研活动
const stu_projects = ()=> import("views/teacher/stu_projects/stu_projects");  //学生项目
const external_exchange = ()=> import("views/teacher/external_exchange/external_exchange");  //对外交流
const teaching_inspection = ()=> import("views/teacher/t_work/work_content/teaching_inspection");  //教学检查
const plans_inspection = ()=> import("views/teacher/t_work/work_content/plans_inspection");  //教案检查
const exchange = ()=> import("views/teacher/external_exchange/exchange_content/exchange");  //交流考察
const stu_competition = ()=> import("views/teacher/stu_projects/stu_content/stu_competition");  //学生竞赛
const achievement = ()=> import("views/teacher/researching_act/activity_content/achievement");  //教研成果
const projects = ()=> import("views/teacher/researching_act/activity_content/projects");  //教研论文
const thesis = ()=> import("views/teacher/researching_act/activity_content/thesis");  //教研项目
const teacher_award = ()=> import("views/teacher/researching_act/activity_content/teacher_award");  //教师奖励

const routes = [
    {
        path: '/' ,
        redirect: '/login'
    } ,
    {
        path: '/login' ,
        component:login
    } ,
    {
        path: '/register' ,
        component:register
    } ,
    {
        path: '/teacher' ,
        component:teacher ,
        children: [
            {
                path: '' ,
                redirect:'teaching_work' ,
            } ,
            {
                path: 'teaching_work' ,
                component:teaching_work ,
                children: [
                    {
                        path: '' ,
                        redirect: 'teaching_inspection'
                    } ,
                    {
                        path: 'teaching_inspection' ,
                        component: teaching_inspection
                    } ,
                    {
                        path: 'plans_inspection' ,
                        component: plans_inspection
                    }
                ]
            } ,
            {
                path: 'researching_activity' ,
                component: researching_activity ,
                children: [
                    {
                        path: '' ,
                        redirect: 'achievement'
                    } ,
                    {
                        path: 'achievement' ,
                        component: achievement
                    } ,
                    {
                        path: 'projects' ,
                        component: projects
                    } ,
                    {
                        path: 'thesis' ,
                        component: thesis
                    } ,
                    {
                        path: 'teacher_award' ,
                        component: teacher_award
                    } ,

                ]
            } ,
            {
                path: 'stu_projects' ,
                component: stu_projects ,
                children: [
                    {
                        path: '' ,
                        redirect: 'stu_competition'
                    } ,
                    {
                        path: 'stu_competition' ,
                        component: stu_competition
                    }
                ]
            } ,
            {
                path: 'external_exchange' ,
                component: external_exchange ,
                children: [
                    {
                        path: '' ,
                        redirect: 'exchange'
                    } ,
                    {
                        path: 'exchange' ,
                        component: exchange
                    }
                ]
            }
        ]
    }
]
export default routes