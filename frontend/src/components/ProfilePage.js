import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError("User not authenticated");
      return;
    }

    axios
      .get(`http://localhost:5000/api/users/profile/${user.id}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch profile details");
        setLoading(false);
      });
  }, [user]);

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!newImage) return alert("Please select an image");

    const formData = new FormData();
    formData.append("profileImage", newImage);

    try {
      await axios.post(`http://localhost:5000/api/users/update-photo/${user.id}`, formData);
      alert("Profile photo updated!");
      window.location.reload();
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to update profile photo");
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-danger text-center mt-5">{error}</h2>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
    <div 
      className="card shadow-lg p-4 rounded-4 text-center"
      style={{ 
        width: "400px", 
        background: "#f8f9fa", // Soft grayish-white for a clean look
        color: "#333", // Dark text for better readability
        border: "1px solid #ddd" // Light border for subtle contrast
      }}
    >
      <h2 className="fw-bold">My Profile</h2>
      {profile ? (
        <>
          <div className="position-relative mt-3">
            <img
              src={profile.profileImage ? `http://localhost:5000${profile.profileImage}` : "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle shadow-lg"
              width="120"
              height="120"
              style={{ border: "4px solid #fff", objectFit: "cover" }}
            />
          </div>
          <h4 className="mt-3 fw-bold">{profile.name}</h4>
          <p className="mb-3">{profile.email}</p>
  
          <div className="d-flex flex-column align-items-center">
            <input type="file" className="form-control mt-3 w-75" onChange={handleImageChange} />
            <button 
              className="btn mt-3 fw-bold shadow"
              style={{ 
                background: "linear-gradient(135deg, #667eea, #764ba2)", 
                color: "#fff", 
                border: "none",
                padding: "8px 15px",
                borderRadius: "8px"
              }}
              onClick={handleUpload}
            >
              Update Profile Photo
            </button>
          </div>
        </>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  </div>
  
  );
};

export default ProfilePage;
