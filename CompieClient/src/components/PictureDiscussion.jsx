import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import pictureService from "../services/pictureService";
import ChatWindow from "./ChatWindow";

export default function PictureDiscussion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const loadPicture = async () => {
      try {
        const response = await pictureService.getById(id);
        setPicture(response.data);
      } catch (error) {
        console.error("Error fetching picture:", error);
      }
    };
    loadPicture();
  }, [id]);

  if (!picture) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container-fluid px-5 py-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate("/")}
        className="mb-3"
      >
        Back
      </Button>

      <div className="d-flex align-items-baseline mb-3">
        <h2 className="mb-0 me-3">{picture.name}</h2>
        <p className="text-muted mb-0">by {picture.artist}</p>
      </div>

      <div className="row" style={{ height: "600px" }}>
        <div className="col-md-9 h-100">
          <img
            src={picture.imageUrl}
            alt={picture.name}
            className="img-fluid rounded shadow-sm h-100"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-3 h-100">
          <ChatWindow pictureId={id} />
        </div>
      </div>
    </div>
  );
}
