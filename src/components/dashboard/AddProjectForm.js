import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/dashboard/AddForm.module.css';

const AddProjectForm = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError('Semua field (termasuk gambar) wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Token tidak ditemukan. Silakan login ulang.');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('projectImage', image); // harus sama dengan backend

      const response = await fetch(
        'https://newbackend-production-8979.up.railway.app/api/projects',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server balikin non-JSON: ${text.slice(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Gagal menambahkan proyek.');
      }

      console.log("RESPONS SUKSES DARI SERVER:", data);

      if (onSuccess) {
        onSuccess(data.data);
      }

      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview('');
      onClose && onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="title" className={styles.label}>Nama Proyek</label>
        <input
          id="title"
          type="text"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>Deskripsi</label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="image" className={styles.label}>Gambar Proyek</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className={styles.input}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            width={400}
            height={200}
            className={styles.imagePreview}
          />
        )}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Menyimpan...' : 'Simpan Proyek'}
      </button>
    </form>
  );
};

export default AddProjectForm;
