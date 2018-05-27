<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="180">
            </el-table-column>
            <el-table-column prop="hobby" label="爱好">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success">更新</el-button>
                    <el-button size="small" type="info" @click="showDetail(scope.row)">详情</el-button>
                    <el-button size="small" type="danger" @click="deleteByid(scope.row['_id'])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- Form -->
        <el-button class="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="爱好" :label-width="formLabelWidth">
                    <el-input v-model="form.hobby" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="savePeopleinfo">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                tableData: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name:'',
                    sex: '',
                    hobby: ''
                },
                formLabelWidth: '120px',
            }
        },
        created: function () {
            axios.get('/api/getallinfo')
             .then( (res)=>{
                 console.log(res)
                 this.tableData = res.data
             })
             .catch((err)=> {
                 console.log(err)
             })
        },
        methods: {
            savePeopleinfo () {
                let params = {
                    name: this.form.name,
                    sex: this.form.sex,
                    hobby: this.form.hobby,
                }
                axios.post('/api/createinfo', params)
                 .then( (res) => {
                    this.dialogFormVisible = false
                    this.$message({
                        message: '新增成功',
                        type: 'success'
                    })
                    axios.get('/api/getallinfo')
                        .then( (res)=>{
                            console.log(res)
                            this.tableData = res.data
                        })
                        .catch((err)=> {
                            console.log(err)
                        })
                 })
                 .catch(function (err) {
                    console.log(err)
                 })
            },
            deleteByid (id) {
                const _id = id
                axios.delete(`/api/deleteByid/${_id}`)
                 .then((res) => {
                     this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    axios.get('/api/getallinfo')
                        .then( (res)=>{
                            console.log(res)
                            this.tableData = res.data
                        })
                        .catch((err)=> {
                            console.log(err)
                        })
                 })
                 .catch((err) => {
                     console.log(err)
                 })
            },
            showDetail (row) {
                console.log(row)
            }
        }
    }
</script>

<style>
    .el-button {
        margin-top: 20px;
    }
</style>
