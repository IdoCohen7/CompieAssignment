import PictureCard from "./PictureCard";

function PictureGrid({ pictures }) {
  return pictures.map((picture) => (
    <PictureCard key={picture.id} picture={picture} />
  ));
}

export default PictureGrid;
