import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImages } from "./imagesApi";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import toast from "react-hot-toast";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import "./App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchImages(query, page);
        setImages((prev) =>
          page === 0 ? data.images : [...prev, ...data.images]
        );
        setTotalPages(data.totalPages);
        if (data.images.length === 0) {
          toast.error("No images found. Try a different query.");
          setError(true);
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />
      {error && (
        <ErrorMessage message="Something went wrong. Please try again." />
      )}
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {loading && <Loader />}
      {page < totalPages && images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isOpen}
          onRequestClose={() => {
            setSelectedImage(null);
            setIsOpen(false);
          }}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
