import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    await axios.post("http://localhost:5000/api/notes/add", formData);
    alert("Note Added!");
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
            />
          </div>
          <div className="mb-3">
            <textarea 
              className="form-control" 
              placeholder="Content" 
              rows="4" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <input 
              type="file" 
              className="form-control" 
              onChange={(e) => setFile(e.target.files[0])} 
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Save Note</button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
