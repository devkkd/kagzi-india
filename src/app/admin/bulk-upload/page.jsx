'use client';
import { useState } from 'react';
import { FiUpload, FiDownload, FiFile, FiCheckCircle, FiAlertCircle, FiX, FiImage } from 'react-icons/fi';

export default function BulkUploadPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  // CSV Template structure based on Product schema
  const generateCSVTemplate = () => {
    const headers = [
      'name',
      'description',
      'price',
      'minimumOrderQuantity',
      'categoryId',
      'subcategoryId',
      'size',
      'coverMaterial',
      'bindingType',
      'coverType',
      'usageApplication',
      'gsm',
      'coverPrint',
      'color',
      'stock',
      'tags',
      'imagePaths'
    ];

    const sampleRow1 = [
      'Premium Notebook',
      'High quality handmade notebook with eco-friendly paper',
      '299',
      '50',
      'Notebooks',
      'Spiral Notebooks',
      'A5 (148 x 210 mm)',
      'Handmade Paper',
      'Thread Binding',
      'Hard Cover',
      'Office, Personal',
      '120',
      'Screen Print',
      'Natural Brown',
      '100',
      'notebook|diary|journal',
      'notebook1.jpg|notebook2.jpg'
    ];

    const sampleRow2 = [
      'Handmade Diary',
      'Beautiful handcrafted diary for daily use',
      '399',
      '25',
      'Diaries',
      '',
      'A4 (210 x 297 mm)',
      'Recycled Paper',
      'Perfect Binding',
      'Soft Cover',
      'Personal, Gift',
      '100',
      'Digital Print',
      'Cream White',
      '50',
      'diary|journal|planner',
      'diary.jpg'
    ];

    // Properly escape CSV values (wrap in quotes if contains comma)
    const escapeCSV = (value) => {
      if (value.includes(',') || value.includes('"') || value.includes('\n')) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    };

    const csvHeaders = headers.join(',');
    const csvSample1 = sampleRow1.map(escapeCSV).join(',');
    const csvSample2 = sampleRow2.map(escapeCSV).join(',');
    const csv = [csvHeaders, csvSample1, csvSample2].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_upload_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const validExt = file?.name?.match(/\.(csv|xlsx|xls)$/i);
    if (file && (validTypes.includes(file.type) || validExt)) {
      setCsvFile(file);
      setErrors([]);
      setResults(null);
    } else {
      alert('Please upload a valid CSV or Excel (.xlsx) file');
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => {
      const existing = new Map(prev.map(f => [f.name, f]));
      files.forEach(f => existing.set(f.name, f));
      return Array.from(existing.values());
    });
  };

  const removeImage = (name) => {
    setImageFiles(prev => prev.filter(f => f.name !== name));
  };

  const handleUpload = async () => {
    if (!csvFile) {
      alert('Please select a CSV file first');
      return;
    }

    setUploading(true);
    setErrors([]);

    try {
      const formData = new FormData();
      formData.append('file', csvFile);
      imageFiles.forEach(img => formData.append('images', img));

      const response = await fetch('/api/products/bulk-upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setCsvFile(null);
        setImageFiles([]);
      } else {
        setErrors(data.errors || ['Upload failed']);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setErrors(['Failed to upload. Please try again.']);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Product Upload</h1>
        <p className="text-gray-600">Upload multiple products at once using CSV file</p>
      </div>

      {/* Instructions Card */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-900 mb-3">📋 How to Use Bulk Upload</h2>
        <ol className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">1.</span>
            <span>Download the CSV template by clicking the button below</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">2.</span>
            <span>Fill in your product details. For <strong>imagePaths</strong>, use only the <strong>filename</strong> (e.g., <code className="bg-blue-100 px-1 rounded">1.png</code> or <code className="bg-blue-100 px-1 rounded">photo1.jpg|photo2.jpg</code>)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">3.</span>
            <span><strong>Category & Subcategory:</strong> Use the name (e.g., "Notebooks") or MongoDB ID</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">4.</span>
            <span>Select your CSV file, then select all the image files referenced in the CSV</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold shrink-0">5.</span>
            <span>Click Upload — images will be matched by filename and uploaded to Cloudinary automatically</span>
          </li>
        </ol>
      </div>

      {/* Download Template */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Step 1: Download Template</h3>
            <p className="text-sm text-gray-600">Get the CSV template with all required fields</p>
          </div>
          <button
            onClick={generateCSVTemplate}
            className="flex items-center gap-2 bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors font-medium"
          >
            <FiDownload size={20} />
            Download Template
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Step 2: Upload CSV File</h3>
        
        {/* File Input */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload"
            disabled={uploading}
          />
          <label
            htmlFor="csv-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <FiUpload size={48} className="text-gray-400 mb-4" />
            {csvFile ? (
              <div className="flex items-center gap-2 text-[#860000] font-medium">
                <FiFile />
                <span>{csvFile.name}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setCsvFile(null);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-700 font-medium mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">CSV or Excel (.xlsx) files</p>
              </>
            )}
          </label>
        </div>

        {/* Image Files Picker */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hidden"
            id="images-upload"
            disabled={uploading}
          />
          <label htmlFor="images-upload" className="cursor-pointer flex flex-col items-center">
            <FiImage size={36} className="text-gray-400 mb-2" />
            <p className="text-gray-700 font-medium mb-1">Click to select product images</p>
            <p className="text-sm text-gray-500">Select all images referenced in your CSV (by filename)</p>
          </label>
          {imageFiles.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2 justify-center">
              {imageFiles.map(f => (
                <span key={f.name} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {f.name}
                  <button onClick={() => removeImage(f.name)} className="text-red-400 hover:text-red-600 ml-1">
                    <FiX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!csvFile || uploading}
          className="w-full bg-[#860000] text-white py-3 rounded-lg hover:bg-[#680000] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Processing...' : 'Upload and Process'}
        </button>

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Processing products...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#860000] h-2 rounded-full animate-pulse w-full" />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FiCheckCircle size={24} className="text-green-600" />
            <h3 className="text-lg font-bold text-gray-900">Upload Complete!</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 mb-1">Successful</p>
              <p className="text-2xl font-bold text-green-900">{results.successful}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700 mb-1">Failed</p>
              <p className="text-2xl font-bold text-red-900">{results.failed}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700 mb-1">Total</p>
              <p className="text-2xl font-bold text-blue-900">{results.total}</p>
            </div>
          </div>
          {results.errors && results.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="font-semibold text-red-900 mb-2">Errors:</p>
              <ul className="text-sm text-red-800 space-y-1">
                {results.errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <FiAlertCircle size={24} className="text-red-600" />
            <h3 className="text-lg font-bold text-red-900">Upload Failed</h3>
          </div>
          <ul className="text-sm text-red-800 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
