import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
function App() {

  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [
      {
        Header: 'name',
        accessor: 'name',
        filterable: true
      }, {
        Header: "email",
        accessor: 'email',
        filterable: true
      }]
  })

  useEffect(() => {
    axios.get('https://randomuser.me/api?results=200')
      .then(({ data: { results } }) => {
        const employees = results.map(employee => ({
          name: `${employee.name.first} ${employee.name.last}`,
          email: `${employee.email}`
        }))
        setEmployeeState({ ...employeeState, employees })

      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>Employee Directory</h1>
      <br />
      <br />
      <ReactTable
        data={employeeState.employees}
        columns={employeeState.columns}
      />
    </>
  );
}

export default App;
