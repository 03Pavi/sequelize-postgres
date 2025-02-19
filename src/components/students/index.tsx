import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import StudentTable from "./table";
import { BasicModal } from "../modal";
import axiosInstance from "@/config/http-client";

const Students = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
  });
  const [isNewData, setIsNewData] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onInputFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value)
      setUser({ ...user, first_name: event.target.value });
  };

  const onInputLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value)
      setUser({ ...user, last_name: event.target.value });
  };

  const addNewSubject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.first_name.length > 0) {
      await axiosInstance.post("/users", {
        first_name: user.first_name,
        last_name: user.last_name,
      });
      setIsNewData((prev) => !prev);
      closeModal();
    }
  };

  return (
    <Box>
      <Box
        sx={{ width: "100%", justifyContent: "space-between", display: "flex" }}
      >
        <Typography component="h4" variant="h4" fontWeight={800} flex={1}>
          Students
        </Typography>
        <Button variant="contained" onClick={openModal}>
          Add
        </Button>
      </Box>
      <StudentTable isNewData={isNewData}/>
      <BasicModal handleClose={closeModal} isOpen={isModalOpen}>
        <form onSubmit={addNewSubject}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            onChange={onInputFirstName}
            margin="normal"
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            onChange={onInputLastName}
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </BasicModal>
    </Box>
  );
};

export default Students;
