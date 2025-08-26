"use client";
import { useState } from "react";

export default function Education() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Proper Waste Segregation Guide",
      description:
        "Learn how to properly separate biodegradable, non-biodegradable, and recyclable materials....",
      category: "segregation",
      audience: "all",
      views: 1245,
      status: "Published",
      media: null,
    },
    {
      id: 2,
      title: "Composting at Home",
      description:
        "Step-by-step guide to creating your own compost bin and reducing organic waste....",
      category: "composting",
      audience: "households",
      views: 0,
      status: "Draft",
      media: null,
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    category: "",
    description: "",
    audience: "all",
    publishNow: false,
    media: null,
    mediaType: "",
  });

  const openAddModal = () => {
    setFormData({
      id: null,
      title: "",
      category: "",
      description: "",
      audience: "all",
      publishNow: false,
      media: null,
      mediaType: "",
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let type = "file";
    if (file.type.startsWith("image/")) type = "image";
    else if (file.type.startsWith("video/")) type = "video";
    else if (file.type === "application/pdf") type = "pdf";

    setFormData({
      ...formData,
      media: URL.createObjectURL(file),
      mediaType: type,
    });
  };

  const handleAddContent = (e) => {
    e.preventDefault();
    const newContent = {
      id: formData.id || Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      audience: formData.audience,
      views: formData.views || 0,
      status: formData.publishNow ? "Published" : "Draft",
      media: formData.media,
      mediaType: formData.mediaType,
    };

    // if editing, replace; else add new
    setContents((prev) => {
      const exists = prev.find((c) => c.id === formData.id);
      if (exists) {
        return prev.map((c) => (c.id === formData.id ? newContent : c));
      }
      return [...prev, newContent];
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setContents(contents.filter((c) => c.id !== id));
  };

  const handlePublish = (id) => {
    setContents(
      contents.map((c) =>
        c.id === id ? { ...c, status: "Published" } : c
      )
    );
  };

  const handleEdit = (content) => {
    setFormData({
      ...content,
      publishNow: content.status === "Published",
    });
    setIsModalOpen(true);
  };

  return (
    <section className="space-y-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Educational Content */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Educational Content
            </h2>
            <button
              onClick={openAddModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              📝 Add Content
            </button>
          </div>

          <div className="space-y-4">
            {contents.map((content) => (
              <div
                key={content.id}
                className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {content.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>📂 {content.category}</span>
                      <span>👥 {content.audience}</span>
                      <span>👁️ {content.views} views</span>
                    </div>
                  </div>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      content.status === "Published"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {content.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(content)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setPreviewContent(content)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Preview
                  </button>
                  {content.status === "Draft" && (
                    <button
                      onClick={() => handlePublish(content.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Content Performance</h3>
          {contents
            .filter((c) => c.status === "Published")
            .map((c) => (
              <p key={c.id} className="text-gray-700">
                {c.title} –{" "}
                <span className="font-bold text-green-600">{c.views} views</span>
              </p>
            ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
          <div className="modal-content bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {formData.id ? "✏️ Edit Content" : "📚 Add Educational Content"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAddContent}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select category</option>
                <option value="segregation">Segregation</option>
                <option value="composting">Composting</option>
                <option value="recycling">Recycling</option>
              </select>

              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Write your educational content..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              ></textarea>

              <select
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Residents</option>
                <option value="households">Households</option>
                <option value="commercial">Commercial</option>
              </select>

              {/* Upload file */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image / Video / PDF
                </label>
                <input
                  type="file"
                  accept="image/*,video/*,application/pdf"
                  onChange={handleFileUpload}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {formData.media && (
                  <p className="text-sm text-green-600 mt-1">
                    ✅ File ready for preview
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.publishNow}
                  onChange={(e) =>
                    setFormData({ ...formData, publishNow: e.target.checked })
                  }
                />
                <label className="text-sm">Publish immediately</label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
          <div className="modal-content bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                👁️ Preview: {previewContent.title}
              </h3>
              <button
                onClick={() => setPreviewContent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <p className="text-gray-700 mb-4">{previewContent.description}</p>

            {previewContent.media && previewContent.mediaType === "image" && (
              <img
                src={previewContent.media}
                alt="Preview"
                className="rounded-lg shadow-md"
              />
            )}
            {previewContent.media && previewContent.mediaType === "video" && (
              <video
                controls
                src={previewContent.media}
                className="rounded-lg shadow-md w-full"
              />
            )}
            {previewContent.media && previewContent.mediaType === "pdf" && (
              <iframe
                src={previewContent.media}
                className="w-full h-96 rounded-lg shadow-md"
                title="PDF Preview"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
