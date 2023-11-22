import React, { useState } from "react";

const AddHotel = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price_per_night: "",
    rating: "",
    amenities: [],
    images: [],
  });
  const handleAmenitiesChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      amenities: checked
        ? [...prevData.amenities, value]
        : prevData.amenities.filter((amenity) => amenity !== value),
    }));
  };
  const handleImageChange = (e) => {
    const { files } = e.target;

    const uploadImage = (pic) => {
      if (
        pic.type === "image/jpeg" ||
        pic.type === "image/jpg" ||
        pic.type === "image/png"
      ) {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dyg7sdadh");

        fetch("https://api.cloudinary.com/v1_1/dyg7sdadh/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setFormData((prevData) => ({
              ...prevData,
              images: [...prevData.images, data.url.toString()],
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    [...files].forEach(uploadImage);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:4000/addHotel";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) =>  response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price_per_night">Price per Night:</label>
          <input
            type="number"
            id="price_per_night"
            name="price_per_night"
            value={formData.price_per_night}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="wifi"
              checked={formData.amenities.includes("wifi")}
              onChange={handleAmenitiesChange}
            />
            Free Wi-Fi
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="parking"
              checked={formData.amenities.includes("parking")}
              onChange={handleAmenitiesChange}
            />{" "}
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="fitness"
              checked={formData.amenities.includes("fitness")}
              onChange={handleAmenitiesChange}
            />{" "}
            Fitness Center
          </label>
          <label>
            <input
              type="checkbox"
              name="amenities"
              value="pool"
              checked={formData.amenities.includes("pool")}
              onChange={handleAmenitiesChange}
            />{" "}
            Swimming Pool
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleAmenitiesChange}
              name="amenities"
              checked={formData.amenities.includes("restaurant")}
              value="restaurant"
            />{" "}
            On-site Restaurant/Bar
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleAmenitiesChange}
              name="amenities"
              value="room-service"
              checked={formData.amenities.includes("room-service")}
            />{" "}
            Room Service
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleAmenitiesChange}
              name="amenities"
              value="shuttle"
              checked={formData.amenities.includes("shuttle")}
            />{" "}
            Airport Shuttle
          </label>
          <label>
            <input
              type="checkbox"
              onChange={handleAmenitiesChange}
              name="amenities"
              value="front-desk"
              checked={formData.amenities.includes("front-desk")}
            />{" "}
            24-Hour Front Desk
          </label>
        </div>
        <div>
          <label htmlFor="images">Select Images:</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Add Hotel</button>
      </form>
    </>
  );
};

export default AddHotel;
