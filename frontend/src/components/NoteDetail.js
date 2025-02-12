import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg p-4" style={{ maxWidth: "600px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-3">{note.title}</Card.Title>
            <Card.Text>{note.summary}</Card.Text>
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
};

export default NoteDetail;
