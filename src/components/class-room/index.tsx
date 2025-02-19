import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ClassRoomTable from "./table";
import { BasicModal } from "../modal";
import axiosInstance from "@/config/http-client";

const ClassRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [isNewData, setIsNewData] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setTitle(event.target.value);
  };

  const addNewSubject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length > 0) {
      await axiosInstance.post("/subjects", {
        title,
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
          ClassRoom
        </Typography>
        <Button variant="contained" onClick={openModal}>
          Add
        </Button>
      </Box>
      <ClassRoomTable isNewData={isNewData} />
      <BasicModal handleClose={closeModal} isOpen={isModalOpen}>
        <form onSubmit={addNewSubject}>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            onChange={onInput}
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

export default ClassRoom;
