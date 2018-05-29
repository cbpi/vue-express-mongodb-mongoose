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
                    <el-button size="small" type="success" @click="updateCurrent(scope.row)">更新</el-button>
                    <el-button size="small" type="info">详情</el-button>
                    <el-button size="small" type="danger" @click="deleteByid(scope.row['_id'])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- Create Form -->
        <el-button class="primary" @click="showCreateform">添加</el-button>
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
        <!-- Update Form -->
        <el-dialog title="更新个人信息" :visible.sync="updatedialogFormVisible" class="updateform">
            <el-form :model="updateform">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="updateform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="updateform.sex" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="爱好" :label-width="formLabelWidth">
                    <el-input v-model="updateform.hobby" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUpdate">确 定</el-button>
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
                updatedialogFormVisible: false,
                form: {
                    name:'',
                    sex: '',
                    hobby: ''
                },
                updateform: {
                    name:'',
                    sex: '',
                    hobby: '',
                    _id: '',
                },
                formLabelWidth: '120px',
            }
        },
        created: function () {
            axios.get('/api/getallinfo')
             .then( (res)=>{
                 this.tableData = res.data
             })
             .catch((err)=> {
                 console.log(err)
             })
        },
        methods: {
            showCreateform () { // 打开新增表单
                this.form = {
                    name:'',
                    sex: '',
                    hobby: ''
                },
                this.dialogFormVisible = true
            },
            savePeopleinfo () { // 保存新增数据
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
                 })
                 .catch((err) => {
                     console.log(err)
                 })
            },
            updateCurrent (row) { // 更新当前选择的信息
                this.updateform = Object.assign({}, row)
                this.updatedialogFormVisible = true
            },
            saveUpdate () { // 保存修改
                var _id = this.updateform._id
                let params = {
                    name: this.updateform.name,
                    sex: this.updateform.sex,
                    hobby: this.updateform.hobby,
                }
                axios.post(`/api/updateByid/${_id}`, params)
                 .then((res) => {
                     this.updatedialogFormVisible = false
                     this.$message({
                        message: '更新成功',
                        type: 'success'
                    })
                 })
                 .catch((err) => {
                     console.log(err)
                 })
            }
        }
    }
</script>

<style>
    .el-button {
        margin-top: 20px;
    }
</style>
