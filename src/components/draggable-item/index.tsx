"use client";

import { useDrag } from "react-dnd";
import { Box } from "@mui/material";
import { useRef, useEffect } from "react";

interface DraggableItemProps {
  id: number;
  name: string;
  type: string; // ✅ Add this
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type, // ✅ Ensure type is correctly passed
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (boxRef.current) {
      drag(boxRef.current);
    }
  }, [drag]);

  return (
    <Box
      ref={boxRef}
      sx={{
        padding: 2,
        margin: 1,
        backgroundColor: isDragging ? "gray" : "lightblue",
        cursor: "grab",
        borderRadius: "8px",
        width: "fit-content",
      }}
    >
      {name}
    </Box>
  );
};

export default DraggableItem;
