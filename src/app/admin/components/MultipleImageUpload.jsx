'use client';
import { useState, useRef } from 'react';
import { FiUpload, FiX, FiImage, FiCheck } from 'react-icons/fi';

export default function MultipleImageUpload({ values = [], onChange, folder = 'products', maxImages = 5 }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check max images limit
    if (values.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed. You can upload ${maxImages - values.length} more.`);
      return;
    }

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files (JPG, PNG, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
        return;
      }
    }

    setUploading(true);
    const uploadedUrls = [];
    const progressArray = files.map(() => 0);
    setUploadProgress(progressArray);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update progress
        progressArray[i] = 50;
        setUploadProgress([...progressArray]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', `kagzi_india/${folder}`);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          uploadedUrls.push(data.data.url);
          progressArray[i] = 100;
          setUploadProgress([...progressArray]);
        } else {
          alert(`Failed to upload ${file.name}: ${data.message}`);
          progressArray[i] = -1;
          setUploadProgress([...progressArray]);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...values, ...uploadedUrls]);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please check your internet connection and try again.');
    } finally {
      setUploading(false);
      setUploadProgress([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleSetAsThumbnail = (index) => {
    if (index === 0) return;
    const newValues = [...values];
    const [thumbnail] = newValues.splice(index, 1);
    newValues.unshift(thumbnail);
    onChange(newValues);
  };

  const handleReorder = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const newValues = [...values];
    const [removed] = newValues.splice(fromIndex, 1);
    newValues.splice(toIndex, 0, removed);
    onChange(newValues);
  };

  return (
    <div className="space-y-3">
      {/* Upload Button */}
      {values.length < maxImages && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full h-32 border-2 border-dashed border-[rgba(208,195,195,1)] rounded-lg flex flex-col items-center justify-center hover:border-[#860000] hover:bg-[#FAF6F1] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#860000] mb-2"></div>
                <p className="text-sm text-gray-600">Uploading images...</p>
                <div className="flex space-x-1 mt-2">
                  {uploadProgress.map((progress, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-gray-300">
                      {progress === 100 && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                      {progress > 0 && progress < 100 && <div className="w-2 h-2 rounded-full bg-[#860000] animate-pulse"></div>}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <FiUpload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-600 mb-1 font-semibold">
                  Click to upload images
                </p>
                <p className="text-xs text-gray-400">
                  {values.length}/{maxImages} images • PNG, JPG, WebP up to 5MB each
                </p>
                <p className="text-xs text-[#860000] mt-1">
                  You can select multiple images at once
                </p>
              </>
            )}
          </button>
        </div>
      )}

      {/* Image Grid */}
      {values.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-700">
              Uploaded Images ({values.length}/{maxImages})
            </p>
            <p className="text-xs text-gray-500">
              First image is the thumbnail
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {values.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#860000] transition-all"
              >
                <img
                  src={url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Thumbnail Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-[#860000] text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <FiCheck size={12} />
                    <span>Thumbnail</span>
                  </div>
                )}

                {/* Image Number */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex flex-col space-y-2">
                    {/* Set as Thumbnail */}
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetAsThumbnail(index)}
                        className="px-3 py-1.5 bg-white text-gray-700 text-xs rounded hover:bg-gray-100 transition-colors font-semibold"
                        title="Set as thumbnail"
                      >
                        Set as Main
                      </button>
                    )}
                    
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors font-semibold"
                      title="Remove image"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Reorder Arrows */}
                <div className="absolute bottom-2 left-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleReorder(index, index - 1)}
                      className="flex-1 bg-white text-gray-700 text-xs py-1 rounded hover:bg-gray-100 font-semibold"
                      title="Move left"
                    >
                      ←
                    </button>
                  )}
                  {index < values.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleReorder(index, index + 1)}
                      className="flex-1 bg-white text-gray-700 text-xs py-1 rounded hover:bg-gray-100 font-semibold"
                      title="Move right"
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {values.length === 0 && !uploading && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <FiImage size={32} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 mb-1">No images uploaded yet</p>
          <p className="text-xs text-gray-400">
            Click the upload button above to add product images
          </p>
        </div>
      )}

      {/* Help Text */}
      {values.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>💡 Tips:</strong>
          </p>
          <ul className="text-xs text-blue-700 mt-1 space-y-1 ml-4 list-disc">
            <li>First image will be used as the main product thumbnail</li>
            <li>Hover over images to reorder, set as main, or remove</li>
            <li>Use arrow buttons (← →) to change image order</li>
            <li>Click "Set as Main" to make any image the thumbnail</li>
          </ul>
        </div>
      )}
    </div>
  );
}
