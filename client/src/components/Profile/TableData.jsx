import React from "react";
import { Table, Button } from "react-bootstrap";

const TableData = ({ theads, data, onActionClick, withdrawloading}) => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-light p-3">
      <div className="table-responsive">
        <Table className="table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {theads.map((thead, index) => (
                <th key={index}>{thead}</th>
              ))}
            </tr> 
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(item).map(([key, value], colIndex) => (
                    <td key={colIndex}>
                      {key === "Action" ? (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => onActionClick(item)}
                        >
                          {withdrawloading ? "Withdrawing..." : "Withdraw"}
                        </Button>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={theads.length} className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableData;
