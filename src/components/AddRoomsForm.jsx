import React, { useState, useEffect } from "react";

const RoomForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    price: "",
    type: "Small",
    photo: null, // untuk file foto
  });

  const [preview, setPreview] = useState(null); // preview foto

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        capacity: initialData.capacity || "",
        price: initialData.price || "",
        type: initialData.type || "Small",
        photo: null, // reset photo saat edit, bisa diubah sesuai kebutuhan
      });
      if (initialData.photoUrl) {
        setPreview(initialData.photoUrl); // kalau ada url foto, tampilkan preview
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

  // khusus untuk input file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));

    if (file) {
      // buat URL preview
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
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 z-50 overflow-y-auto"
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Room" : "Add New Room"}
      </h2>

      <div className="mb-4">
      
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-5 border h-30"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 max-h-40 object-contain border rounded"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Room Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      

      <div className="mb-4">
        <label className="block mb-1 font-medium">Capacity</label>
        <input
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Price</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      {/* Input foto */}
      

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          {initialData ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
