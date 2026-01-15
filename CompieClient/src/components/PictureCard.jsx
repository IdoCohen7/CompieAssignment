import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PictureCard({ picture }) {
  const navigate = useNavigate();

  return (
    <>
      <div key={picture.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <Card
          className="shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/picture/${picture.id}`)}
        >
          <Card.Img
            variant="top"
            src={picture.imageUrl}
            alt={picture.name}
            style={{ height: "280px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{picture.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {picture.artist}
            </Card.Subtitle>
            <Card.Text
              // prevent overflow for long descriptions
              style={{
                fontSize: "0.9rem",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {picture.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
