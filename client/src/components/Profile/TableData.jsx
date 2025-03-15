import React from 'react'
import { Table } from 'react-bootstrap';


const TableData = ({theads, data}) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-light p-4">
        <Table> 
          <thead>
            <tr>
              {theads.map((thead, index) => (
                <th key={index}>{thead}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}    
              </tr>
            ))} 
          </tbody>
        </Table>
      </div>
  )
}

export default TableData;