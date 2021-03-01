<template>
    <div id="nav">
        <span>湖南科技大学教学礼拜信息系统</span>
        <profile_pho></profile_pho>
    </div>
</template>

<script>

    import Profile_pho from "./profile_pho";
    export default {
        name: "navigation" ,
        components: {Profile_pho},
        data() {
            return {
                role_id: sessionStorage.getItem('role') ,  //教师的用户角色：1：普通教师 2：系主任 3：院长/教务办 4：管理员(后端获取)
                role_name: '教师' ,   //该页面是教师的专属页面
                t_name: sessionStorage.getItem('t_name')
            }
        }
    }
</script>

<style scoped>
    #nav {
        background-image: url("../assets/nav_background.png");
        width: 100%;
        height: 85px;
        margin: 0 auto;
        line-height: 85px;
        display: flex;
        align-items: center;
    }

    span {
        font-family: Arial;
        font-size: 22px;
        color: white;
        margin-left: 40px;
    }
</style>