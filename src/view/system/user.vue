<template lang="pug">
    .user._content-box
        Card
            .search-wrap
                Form(ref="searchForm" :model="searchForm" inline)
                    FormItem
                        Input(type="text" v-model="searchForm.user" placeholder="请输入用户名称/登录账号")
                .operate-btn
                    Button.btn(type="primary" size="default" @click="search") 查询
                    Button.btn(type="primary" size="default" @click="add") 添加用户
            .my-table
                Table(:columns="tableColumns" :data="tableData" :loading="tableLoading")
                    template(slot-scope="{ row, index }" slot="action")
                        span.tab-btn 编辑
                        span(v-if="row.status === 0").tab-btn 禁用
                        span(v-else).tab-btn 启用
                        span.tab-btn 删除
            .my-page
                Page(:current.sync="currentPage" :total="total" :page-size="10" show-elevator @on-change="changePage")
</template>

<script>
    export default {
        name: 'User',
        data() {
            return {
                searchForm: {
                    user: ''
                },
                tableColumns: [
                    {
                        title: '序号',
                        width: 70,
                        align: 'center',
                        render: (h, params) => {
                            return h('span',params.index + 1);
                        }
                    },
                    {
                        title: '用户名',
                        key: 'userName',
                        minWidth: 140,
                        align: 'center'
                    },
                    {
                        title: '登陆帐号',
                        key: 'account',
                        minWidth: 140,
                        align: 'center'
                    },
                    {
                        title: '系统角色',
                        key: 'role',
                        minWidth: 140,
                        align: 'center'
                    },
                    {
                        title: '手机号码',
                        key: 'tel',
                        minWidth: 140,
                        align: 'center'
                    },
                    {
                        title: '职位',
                        key: 'office',
                        minWidth: 140,
                        align: 'center'
                    },
                    {
                        title: '所属机构',
                        key: 'mechanism',
                        minWidth: 140,
                        align: 'center'
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                        align: 'center'
                    }
                ],
                tableData: [
                    // status 此处为模拟的
                    {userName: '用户一', account: '帐号', role: '角色一', tel: 123456789, office: '职位一', mechanism: '机构一', remark: '', status: 0},
                    {userName: '用户一', account: '帐号', role: '角色一', tel: 123456789, office: '职位一', mechanism: '机构一', remark: '', status: 1}
                ],
                tableLoading: false,
                currentPage: 1,
                total: 2,
            };
        },
        methods: {
            search() {
                //
            },
            add() {
                //
            },
            changePage(index) {
                //
            }
        }
    };
</script>

<style lang="stylus" scoped>

</style>
