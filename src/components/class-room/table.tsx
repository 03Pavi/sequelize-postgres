"use client";
import axiosInstance from "@/config/http-client";
import { useEffect, useState } from "react";
import GenericTable from "../table";
import { Box, CircularProgress, List, ListItem, Popover } from "@mui/material";

interface UserSubject {
  created_at: string;
  updated_at: string;
  UserId: number;
  SubjectId: number;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  user_subject: UserSubject;
}

interface Subject {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  users: User[];
}
interface UserOption {
  label: string;
  value: number;
}

interface ClassRoomTableProps {
  isNewData: boolean;
}
const ClassRoomTable = ({ isNewData }: ClassRoomTableProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [userList, setUserList] = useState<UserOption[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axiosInstance.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchSubjects();
    setIsLoading(false);
  }, [isNewData, isDeleted]);

  const columns: {
    key: keyof Subject;
    label: string;
    align?: "left" | "right" | "center";
  }[] = [
    { key: "id", label: "ID", align: "left" },
    { key: "title", label: "Title", align: "left" },
    { key: "users", label: "Associated User", align: "left" },
  ];

  const openModal = (
    data: Subject,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const users: UserOption[] = data.users.map((user) => ({
      label: user.full_name,
      value: user.id,
    }));
    setUserList(users);
    setAnchorEl(event.currentTarget);
  };

  const deleteRow = async (
    data: Subject,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    await axiosInstance.delete(`/subjects/${data.id}`);
    setIsDeleted((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <GenericTable
          handleDeleteRow={deleteRow}
          columns={columns}
          data={subjects}
          handleOpenModal={openModal}
        />
      )}
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionProps={{}}
      >
        <List>
          {userList.length > 0 ? (
            userList.map((user) => (
              <ListItem key={user.value}>
                {user.value}.) &nbsp;{user.label}
              </ListItem>
            ))
          ) : (
            <ListItem>No User</ListItem>
          )}
        </List>
      </Popover>
    </Box>
  );
};

export default ClassRoomTable;
