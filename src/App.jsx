import { useState } from "react";
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

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setLoading(true);
    setError(false);

    try {
      const data = await fetchImages(newQuery, 1);
      setImages(data.images);
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

  const handleLoadMore = async () => {
    if (page >= totalPages) return;
    setLoading(true);
    try {
      const data = await fetchImages(query, page + 1);
      setImages((prevImages) => {
        const uniqueImages = data.images.filter(
          (newImage) => !prevImages.some((image) => image.id === newImage.id)
        );
        return [...prevImages, ...uniqueImages];
      });
      setPage((prevPage) => prevPage + 1);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
  };

  const isLoadMoreVisible = images.length > 0 && page < totalPages;

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />
      {error && (
        <ErrorMessage message="Something went wrong. Please try again." />
      )}
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {loading && <Loader />}
      {isLoadMoreVisible && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isOpen && (
        <ImageModal
          isOpen={isOpen}
          onRequestClose={handleCloseModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;
