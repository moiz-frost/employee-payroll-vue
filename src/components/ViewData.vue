<template>

  <div class="container">
    <div class="page-header text-center">Employees + Payroll</div>
    <div class="panel panel default">
      <div class="panel-heading text-center">
        <h2>Employee List</h2>
      </div>
      <div class="panel-body">
        <table v-if="countEmployees != 0" class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Add Payroll</th>
              <th>Show Payroll</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody v-for="employee in employees" >
            <tr class="accordion-toggle">
              <td>{{ employee.name }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.mobile }}</td>
              <td>
                <p data-placement="top" data-toggle="tooltip" title="Add Payroll">
                  <button class="btn btn-success btn-xs">
                    <span 
                    data-toggle="collapse" 
                    data-target="#targetBody" 
                    class="glyphicon glyphicon-plus" 
                    @click="triggerPayrollForm">
                  </span>
                  </button>
                </p>
              </td>
              <td>
                <p data-placement="top" data-toggle="tooltip" title="Show Payroll">
                  <button class="btn btn-info btn-xs">
                    <span 
                    data-toggle="collapse" 
                    data-target="#targetBody" 
                    class="glyphicon glyphicon-file"
                    @click="showPayroll">
                  </span>
                  </button>
                </p>
              </td>
              <td>
                <p data-placement="top" data-toggle="tooltip" title="Edit">
                  <button class="btn btn-primary btn-xs">
                    <span class="glyphicon glyphicon-pencil" @click="editEmployee(employee)"></span>
                  </button>
                </p>
              </td>
              <td>
                <p data-placement="top" data-toggle="tooltip" title="Edit">
                  <button class="btn btn-danger btn-xs">
                    <span class="glyphicon glyphicon-trash" @click="removeEmployee(employee)"></span>
                  </button>
                </p>
              </td>
            </tr>
            <tr>
              <div class="accordion-body collapse" id="targetBody">
                <form v-if="showPayrollForm" class="form-horizontal" v-on:submit.prevent="addPayroll(employee)">
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="date">Date</label>
                    <div class="col-sm-10">
                      <input 
                      type="date" 
                      class="form-control" 
                      placeholder="Date" 
                      name="date" 
                      v-model="newPayroll.date">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Salary</label>
                    <div class="col-sm-10">          
                      <input type="text" class="form-control" placeholder="Salary" name="salary" v-model="newPayroll.salary">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Bonus</label>
                    <div class="col-sm-10">          
                      <input type="text" class="form-control" placeholder="Bonus" name="bonus" v-model="newPayroll.bonus">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label col-sm-2" for="pwd">Mobile</label>
                    <div class="col-sm-10">          
                      <input type="text" class="form-control" placeholder="Comments" name="comments" v-model="newPayroll.comments">
                    </div>
                  </div>
                  <div class="form-group">        
                    <div class="col-sm-offset-2 col-sm-10">
                      <button type="submit" class="btn btn-info">Submit</button>
                    </div>
                  </div>
                </form>
                <td v-if="isShowPayrollBtnClicked">
                  <table class="table table-striped">
                    <thead>
                      <th>Date</th>
                      <th>Salary</th>
                      <th>Bonus</th>
                      <th>Comments</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </thead>
                    <tbody>
                      <tr v-for="payroll in employee.payroll">
                        <td>{{ payroll.date }}</td>
                        <td>{{ payroll.salary }}</td>
                        <td>{{ payroll.bonus }}</td>
                        <td>{{ payroll.comments }}</td>
                        <td>
                          <p data-placement="top" data-toggle="tooltip" title="Edit">
                            <button class="btn btn-primary btn-xs">
                              <span class="glyphicon glyphicon-pencil" @click="editPayroll(employee, payroll)"></span>
                            </button>
                          </p>
                        </td>
                        <td>
                          <p data-placement="top" data-toggle="tooltip" title="Delete">
                            <button class="btn btn-danger btn-xs">
                              <span class="glyphicon glyphicon-trash" @click="removePayroll(employee, payroll)"></span>
                            </button>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </div>
            </tr>
          </tbody>
        </table>

        <form v-if="showEmployeeForm" class="form-horizontal" v-on:submit.prevent="addEmployee">
          <div class="form-group">
            <label class="control-label col-sm-2" for="name">Name</label>
            <div class="col-sm-10">
              <input
              v-validate="'required|alpha'"  
              type="text" 
              class="form-control" 
              placeholder="Name" 
              name="name" 
              :class="{'input': true, 'is-danger': errors.has('name') }"
              v-model="newEmployee.name">
              <i v-show="errors.has('name')" class="fa fa-warning"></i>
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="email">Email</label>
            <div class="col-sm-10">          
              <input 
              v-validate="'required|email'"  
              type="email" 
              class="form-control"
              placeholder="Email" 
              name="email" 
              :class="{'input': true, 'is-danger': errors.has('email') }"
              v-model="newEmployee.email">
              <i v-show="errors.has('email')" class="fa fa-warning"></i>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2" for="pwd">Mobile</label>
            <div class="col-sm-10">          
              <input
              v-validate="'required|numeric'"  
              type="text" 
              class="form-control" 
              placeholder="Mobile"
              name="mobile"
              :class="{'input': true, 'is-danger': errors.has('mobile') }"
              v-model="newEmployee.mobile">
              <i v-show="errors.has('mobile')" class="fa fa-warning"></i>
              <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>
            </div>
          </div>
          <div class="form-group">        
            <div class="col-sm-offset-2 col-sm-10">
              <button type="submit" class="btn btn-info">Submit</button>
            </div>
          </div>
        </form>

        <div class="row">
          <div class="col-md-12 text-center">
            <button v-if="isAddEmployeeBtnClicked" type="button" class="btn btn-primary" @click="triggerForm">Add Employee</button>
          </div>
        </div>
        

      </div>
    </div>
  </div>

</template>

<script>
	
import { employeeRef } from '../firebase'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import toastr from 'toastr'

Vue.use(VeeValidate);

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export default {
	name: 'ViewData',
  firebase: {
  	employees: employeeRef
	},
	data() {
		return {
      // new employee instance
      newEmployee: {
        name: '',
        email: '',
        mobile: '',
      },
      // new payroll instance
      newPayroll: {
        date: '',
        salary: '',
        bonus: '',
        comments: ''
      },
      showEmployeeForm: false,
      isAddEmployeeBtnClicked: true,
      showPayrollForm: false,
      isShowPayrollBtnClicked: false,
      isAddPayrollBtnClicked: false
		}
	},
  methods: {
    addEmployee() {
      let self = this
      this.$validator.validateAll()
        .then(function(result) {
          if (result) {
            employeeRef.push(this.newEmployee)
            self.newEmployee.name = ''
            self.newEmployee.email = ''
            self.newEmployee.mobile = ''
            self.showEmployeeForm = false
            self.isAddEmployeeBtnClicked = true
          }
        }.bind(this)) // took me a while to figure this one out
      toastr.success("Added Employee")
    },
    removeEmployee(employee) {
      employeeRef.child(employee['.key']).remove()
    },
    editEmployee(employee) {
    },
    addPayroll(employee) {
      employeeRef.child(employee['.key']).child('payroll').push(this.newPayroll)
      this.newPayroll.date = ''
      this.newPayroll.salary = ''
      this.newPayroll.bonus = ''
      this.newPayroll.comments = ''
      this.isShowPayrollBtnClicked = false
      this.showPayrollForm = false
    },
    editPayroll() {

    },
    removePayroll(employee, payroll) {
      // Cant figure this one out, cant retrieve the child key basically
      console.log("Cant figure this one out")
      // console.log(employeeRef.child(employee['.key']).child('payroll'))
      // employeeRef.child(employee['.key']).child('payroll').child(payroll['.key']).remove()
    },
    triggerForm() {
      this.showEmployeeForm = true
      this.isAddEmployeeBtnClicked = false
    },
    triggerPayrollForm() {
      this.isShowPayrollBtnClicked = false
      this.showPayrollForm = false
      this.isShowPayrollBtnClicked = false
      this.showPayrollForm = true
    },
    showPayroll() {
      this.isShowPayrollBtnClicked = false
      this.showPayrollForm = false
      this.isShowPayrollBtnClicked = true
      this.showPayrollForm = false
    }
  },
  computed: {
    countEmployees() {
      return this.employees.length
    }
  }
}

</script>

<style scoped>
	
</style>