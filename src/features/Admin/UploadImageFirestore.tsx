import { useState, ChangeEvent, FormEvent } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { storage, firestore } from '../../utils/Firebase';
import ImageList from './ImageList';
import Header from '../../components/Header/Header';

const ImageUploadForm = () => {
  const [imageName, setImageName] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    const storageRef = ref(storage, `AtalBotanicalImages/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);

        // Store metadata in Firestore
        try {
          const userDocRef = doc(firestore, 'AtalBotanicalUsers', 'images');
          await setDoc(userDocRef, {
            images: arrayUnion({
              imageName,
              gender,
              ageRange,
              imageUrl: downloadURL,
              timestamp: new Date()
            })
          }, { merge: true });
          console.log('Metadata saved in Firestore');
        } catch (error) {
          console.error('Error saving metadata to Firestore:', error);
        }
      }
    );
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Header />
      <form className='signup-form' onSubmit={handleImageUpload}>
        <div className='form-group'>
          <label>
            Image Name:
            <input
              className='form-control'
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Gender:
            <input
              type="radio"
              value="Male"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            Male
            <input
              type="radio"
              value="Female"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            Female
          </label>
        </div>
        <div className='form-group'>
          <label>
            Age Range:
            <select
              className='form-control'
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              required
            >
              <option value="">Select age range</option>
              <option value="5-15">5-15</option>
              <option value="16-30">16-30</option>
              <option value="31-50">31-50</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Upload Image:
            <input
              className='form-control'
              type="file"
              onChange={handleFileChange}
              required
            />
          </label>
        </div>
        <button type="submit">Upload Image</button>
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      </form>
      <ImageList />
    </>
  );
};

export default ImageUploadForm;
