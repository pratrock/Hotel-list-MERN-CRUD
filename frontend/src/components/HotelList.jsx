import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { searchHotels, showHotelData } from "../actions/hotelAction";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./HotelList.css";
function HotelList({ showHotelData, hotels, loading, searchHotels }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 5;
  const navigate = useNavigate();
  const handleDelete = (id) => {
    const apiUrl = `http://localhost:4000/deleteHotel/${id}`;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        showHotelData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleEdit = (id) => {
    // navigate('/componentB',);

    navigate(`/editHotel/${id}`, { state: { id: id, name: "editId" } });
    // navigate(`/editHotel/${id}`, { state: { id, name: "editID" } });
  };

  const handleSearch = () => {
    console.log("clicked");
    searchHotels(searchTerm);
  };

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    showHotelData();
  }, [showHotelData]);
  return (
    <div className="hotel-list-container">
      <label>
        Search:
        <input
          type="text"
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {currentHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-item">
              <h3>{hotel.name}</h3>
              <p>
                {hotel.location} {`$ ${hotel.price_per_night}`}
              </p>
              <div>{hotel.description}</div>
              <p>{hotel.rating}</p>
              <div>
                <button onClick={() => handleEdit(hotel._id)}>Edit</button>
              </div>
              <div>
                <button onClick={() => handleDelete(hotel._id)}>Delete</button>
              </div>
            </div>
          ))}
          {/* Pagination buttons */}
          <div className="pagination">
            {Array.from({
              length: Math.ceil(hotels.length / hotelsPerPage),
            }).map((_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("my state", state.hotels);
  return {
    hotels: state.hotels.hotels,
    loading: state.hotels.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showHotelData: () => dispatch(showHotelData()),
    searchHotels: (searchTerm) => dispatch(searchHotels(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelList);
