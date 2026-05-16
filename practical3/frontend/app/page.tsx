'use client';

import { useState, ChangeEvent } from 'react';
import axios from 'axios';

export default function Home() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {

    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {

    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();

    formData.append('file', selectedFile);

    try {

      const response = await axios.post(
        'http://localhost:8000/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },

          onUploadProgress: (progressEvent) => {

            const percent = Math.round(
              (progressEvent.loaded * 100) /
              (progressEvent.total || 1)
            );

            setProgress(percent);
          }
        }
      );

      setMessage(response.data.message);

    } catch (error: any) {

      setMessage(
        error.response?.data?.message || 'Upload Failed'
      );
    }
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        File Upload App
      </h1>

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-5"
      />

      <br />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-5 py-2 rounded"
      >
        Upload File
      </button>

      <p className="mt-5">
        Upload Progress: {progress}%
      </p>

      <p className="mt-3 text-green-600">
        {message}
      </p>

    </div>
  );
}