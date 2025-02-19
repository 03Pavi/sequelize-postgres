"use client";
import axiosInstance from "@/config/http-client";
import { useEffect, useState } from "react";
import GenericTable from "../table";
import { Box, CircularProgress } from "@mui/material";

interface Column {
  key: keyof Student;
  label: string;
  align?: "left" | "right" | "center";
}
interface Student {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  contact: string[];
}

interface Response {
  rows: Student[];
  count: number;
}
interface StudentTableProps {
  isNewData: boolean;
}

const StudentTable = ({ isNewData }: StudentTableProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [students, setStudents] = useState<Response>({
    rows: [],
    count: 0,
  });

  const deleteUser = async (
    data: Student,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await axiosInstance.delete(`/users/${data.id}`);
    setIsDeleted((prev) => !prev);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchUsers();
    setIsLoading(false);
  }, [isDeleted, isNewData]);

  const columns: Column[] = [
    { key: "id", label: "ID", align: "left" },
    { key: "first_name", label: "First Name", align: "left" },
    { key: "last_name", label: "Last Name", align: "left" },
    { key: "full_name", label: "Full Name", align: "left" },
    // { key: "contact", label: "Contact", align: "left" },
  ];

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <GenericTable
          columns={columns}
          data={students.rows}
          handleDeleteRow={deleteUser}
        />
      )}
    </Box>
  );
};

export default StudentTable;
