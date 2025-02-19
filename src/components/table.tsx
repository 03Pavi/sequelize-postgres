import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";

interface TableProps<T> {
  columns: {
    key: keyof T;
    label: string;
    align?: "right" | "left" | "center";
  }[];
  data: T[];
  handleOpenModal?: (
    data: T,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;

  handleDeleteRow: (
    data: T,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function GenericTable<T>({
  columns,
  data,
  handleDeleteRow,
  handleOpenModal,
}: TableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="generic table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.key)}
                align={column.align || "left"}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0
            ? data.map((row, rowIndex) => {
                console.log(row, "hello");
                return (
                  <TableRow
                    key={rowIndex}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          key={String(column.key)}
                          align={column.align || "left"}
                        >
                          {typeof row[column.key] === "string" ||
                          typeof row[column.key] === "number" ? (
                            String(row[column.key])
                          ) : (
                            <Button
                              onClick={(e) =>
                                handleOpenModal && handleOpenModal(row, e)
                              }
                            >
                              See User
                            </Button>
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton onClick={(e) => handleDeleteRow(row, e)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
