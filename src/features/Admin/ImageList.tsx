// src/components/ImageList.js
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../utils/Firebase';

type Props = {
  imageName: string | number,
  ageRange: string,
  gender: string,
  imageUrl: string
}

const ImageList = () => {
  const [images, setImages] = useState<Props[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userDocRef = doc(firestore, 'AtalBotanicalUsers', 'images');
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setImages(data.images || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className='image-gallery-wrapper'>
      <h2>Uploaded Images</h2>
      <div className="image-gallery">
        {images.map((image, index) => (
          <div className='img' key={index}>
            <img src={image.imageUrl} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
            <p>Name: {image.imageName}</p>
            <p>Gender: {image.gender}</p>
            <p>Age Range: {image.ageRange}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
