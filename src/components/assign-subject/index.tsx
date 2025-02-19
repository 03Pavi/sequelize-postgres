import axiosInstance from "@/config/http-client";
import { Alert, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../draggable-item";
import MyDropTarget from "../drop-zone";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
}

interface Response {
  rows: Student[];
  count: number;
}

interface Subject {
  id: number;
  title: string;
}

const AssignSubject = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Response>({ rows: [], count: 0 });
  const [message, setMessage] = useState("");
  const [drop, setDrop] = useState({
    student_id: 0,
    subject_id: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axiosInstance.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
    fetchUsers();
  }, []);

  const handleAssign = async () => {
    console.log(drop, "nckenck");
    try {
      const response = await axiosInstance.post(
        `/subjects/assign/${drop.student_id}/${drop.subject_id}`
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error assigning subject:", error);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Subjects as Drop Targets */}
        <Box
          className="subjects"
          sx={{ display: "flex", flexWrap: "wrap", height: "max-content" }}
        >
          {subjects.map((subject) => (
            <DraggableItem
              type="subject"
              key={subject.id}
              id={subject.id}
              name={subject.title}
            />
          ))}
        </Box>
        <Box>
          <MyDropTarget
            accept="subject"
            onDrop={(item) =>
              setDrop((prev) => ({ ...prev, subject_id: item.id }))
            }
          />
          <MyDropTarget
            accept="student"
            onDrop={(item) =>
              setDrop((prev) => ({ ...prev, student_id: item.id }))
            }
          />
          <Button variant="contained" onClick={handleAssign} fullWidth>
            Assign
          </Button>

          {message && <Alert severity="success">{message}</Alert>}
        </Box>

        <Box
          className="students"
          sx={{ display: "flex", flexWrap: "wrap", height: "max-content" }}
        >
          {students.rows.map((student) => (
            <DraggableItem
              type="student"
              key={student.id}
              id={student.id}
              name={student.full_name}
            />
          ))}
        </Box>
      </Box>
    </DndProvider>
  );
};

export default AssignSubject;
