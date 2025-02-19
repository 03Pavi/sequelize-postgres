"use client";

import { useDrop } from "react-dnd";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

interface DropTargetProps {
  accept: string | string[];
  onDrop: (item: any) => void;
}

const MyDropTarget: React.FC<DropTargetProps> = ({ accept, onDrop }) => {
  const dropRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  const [{ isOver }, drop] = useDrop(() => ({
    accept,
    drop: (item: { id: number }) => {
      setValue(item.id);
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(dropRef);

  return (
    <>
      <Box
        ref={dropRef}
        sx={{
          width: "200px",
          height: "100px",
          border: "2px dashed gray",
          backgroundColor: isOver ? "lightblue" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography>{accept}</Typography>
        <TextField value={value} variant="outlined" fullWidth margin="normal" />
      </Box>
    </>
  );
};

export default MyDropTarget;
