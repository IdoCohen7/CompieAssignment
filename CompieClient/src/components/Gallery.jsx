import { useState, useEffect, useRef } from "react";
import { Container, Form, InputGroup, Spinner } from "react-bootstrap";
import pictureService from "../services/pictureService";
import PictureGrid from "./PictureGrid";

export default function Gallery() {
  const [pictures, setPictures] = useState([]);
  const [search, setSearch] = useState("");
  // pagination states
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const lastPictureRef = useRef();

  const fetchPictures = async (searchTerm, pageNum, isNewSearch = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await pictureService.getAll(searchTerm, pageNum, 8);
      const newPictures = response.data;

      if (newPictures.length < 8) {
        setHasMore(false);
      }

      if (isNewSearch) {
        setPictures(newPictures);
      } else {
        setPictures((prev) => [...prev, ...newPictures]);
      }
    } catch (error) {
      console.error("Error fetching pictures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPictures("", 1, true);
  }, []);

  // debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setHasMore(true);
      fetchPictures(search, 1, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastPictureRef.current) {
      observer.current.observe(lastPictureRef.current);
    }
  }, [loading, hasMore, pictures]);

  // fetch more pictures when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPictures(search, page, false);
    }
  }, [page]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container className="py-4">
      <InputGroup className="mb-4">
        <InputGroup.Text className="bg-white">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="What are you looking for?"
          value={search}
          onChange={handleSearch}
        />
      </InputGroup>

      {pictures.length === 0 && !loading ? (
        <div className="text-center text-muted py-5">
          <p>No pictures found. Try searching something else.</p>
        </div>
      ) : (
        <>
          <div className="row">
            <PictureGrid pictures={pictures} />
          </div>
          <div ref={lastPictureRef} style={{ height: "1px" }} />
          {loading && (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" />
            </div>
          )}
        </>
      )}
    </Container>
  );
}
