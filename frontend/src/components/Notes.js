import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes/all");
        setNotes(res.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Notes</h2>
      <div className="row">
        {notes.map((note) => (
          <div key={note.id} className="col-md-4 mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.summary.substring(0, 80)}...</Card.Text>
                <Link to={`/notes/${note.id}`}>
                  <Button variant="primary">View Note</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
