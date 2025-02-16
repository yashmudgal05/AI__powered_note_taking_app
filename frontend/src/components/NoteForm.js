import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    try {
      await axios.post("http://localhost:5000/api/notes/add", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Add auth token
      });
      alert("Note Added!");
    } catch (error) {
      console.error("Error adding note:", error.response?.data || error.message);
      alert("Failed to add note");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Create Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Upload Image (Optional):</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label>Upload Audio (Optional):</label>
            <input
              type="file"
              className="form-control"
              accept="audio/*"
              onChange={(e) => setAudio(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
