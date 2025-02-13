import { useNavigate } from "react-router-dom";

const NotesDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ cursor: "pointer" }} onClick={() => navigate("/create")}>
            <div className="card-body">
              <h4 className="card-title">📌 Create New Note</h4>
              <p className="card-text">Click here to create a new note.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ cursor: "pointer" }} onClick={() => navigate("/notes")}>
            <div className="card-body">
              <h4 className="card-title">📚 My Notes</h4>
              <p className="card-text">View and manage all your notes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesDashboard;
