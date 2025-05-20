import React, { useState, useEffect } from "react";

const RoomForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    price: "",
    type: "Small",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        capacity: initialData.capacity || "",
        price: initialData.price || "",
        type: initialData.type || "Small",
        photo: null,
      });
      if (initialData.photoUrl) {
        setPreview(initialData.photoUrl);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.capacity || !formData.price) return;
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 z-50 overflow-y-auto flex flex-col justify-between min-h-screen"
    >
      {/* Konten Form */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {initialData ? "Edit Room" : "Add New Room"}
        </h2>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Room Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 h-40 w-full object-contain border rounded"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Room Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Capacity</label>
          <input
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Price</label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
      </div>

      {/* Tombol */}
      <div className="mt-auto flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
