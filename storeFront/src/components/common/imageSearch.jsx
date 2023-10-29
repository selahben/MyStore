import { useEffect, useState } from "react";

export function ImageSearch({ checkedImage, setCheckedImage }) {
  const [searchResultImages, setSearchResultImages] = useState({});

  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    searchImages();
    function searchImages() {
      const apiKey = "21017783-2527864ffaacc014465093f44";
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
        searchPhrase
      )}&per_page=8`;

      // Sending a GET request to Pixabay API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setSearchResultImages(data))
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchPhrase]);

  return (
    <>
      <h6>..or search PIXABAY:</h6>
      <input
        type="text"
        id="search-input"
        placeholder="Enter search query"
        onChange={(e) => setSearchPhrase(e.target.value)}
        value={searchPhrase}
      />

      <div
        id="image-container"
        className="d-flex gap-1 my-1 flex-wrap justify-content-center"
      >
        {searchResultImages.totalHits > 0 ? (
          searchResultImages.hits.map((image, index) => {
            return (
              <div
                className="imageResultDiv"
                key={index + 1}
                style={{ width: "20%" }}
              >
                <input
                  className="form-check-input imageSelect"
                  type="radio"
                  name="imageResult"
                  id={`imageResult${index + 1}`}
                  onClick={() => setCheckedImage(image.webformatURL)}
                  checked={image.webformatURL === checkedImage}
                  onChange={() => setCheckedImage(image.webformatURL)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`imageResult${index + 1}`}
                  style={
                    image.webformatURL === checkedImage
                      ? {
                          borderRadius: "10px",
                          boxShadow: "0 0 5px 0 #00000080",
                          border: "2px solid #00000080",
                        }
                      : { borderRadius: "10px" }
                  }
                >
                  <img
                    style={{
                      height: "50px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    src={image.webformatURL}
                    alt=""
                  />
                </label>
              </div>
            );
          })
        ) : (
          <p>No images found for the given query.</p>
        )}
      </div>
    </>
  );
}
