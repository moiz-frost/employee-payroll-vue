import Firebase from 'firebase'


const config = {
  apiKey: "AIzaSyDAtv9GHjogKXbb04FDSNDGuj_H_oDd8V4",
  authDomain: "employee-payroll-5573d.firebaseapp.com",
  databaseURL: "https://employee-payroll-5573d.firebaseio.com",
  projectId: "employee-payroll-5573d",
  storageBucket: "employee-payroll-5573d.appspot.com",
  messagingSenderId: "384349945550"
};

let app = Firebase.initializeApp(config)
export const db = app.database()
export const employeeRef = db.ref('employees')
