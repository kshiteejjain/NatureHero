import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { firestore } from '../../utils/Firebase';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  gender: string,
  imageName: string | number,
  ageRange: string,
  imageUrl: string,
  url: string
}

const OriginalImages = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<Props[]>([]);
  const [filteredImages, setFilteredImages] = useState<Props[]>([]);
  const [gender, setGender] = useState<string>('');
  const [ageRange, setAgeRange] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const userDocRef = doc(firestore, 'AtalBotanicalUsers', 'images');
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setImagePaths(data.images || []);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  console.log('filteredImages', filteredImages)

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imagePath);
    let natureHero = localStorage.getItem('natureHero');
    let natureHeroObject = natureHero ? JSON.parse(natureHero) : {};
    let newProperty = { 'selectedImage': imagePath };
    Object.assign(natureHeroObject, newProperty);
    localStorage.setItem('natureHero', JSON.stringify(natureHeroObject));

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    let existingCookie = document.cookie;
    existingCookie += 'imgSlctd!';
    document.cookie = existingCookie;
  };

  const handleFilterChange = () => {
    let filtered = imagePaths;
    if (gender) {
      filtered = filtered.filter(image => image.gender === gender);
    }
    if (ageRange) {
      filtered = filtered.filter(image => image.ageRange === ageRange);
    }
    setFilteredImages(filtered);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleAgeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAgeRange(e.target.value);
  };

  useEffect(() => {
    handleFilterChange();
  }, [gender, ageRange, imagePaths]);

  const handleClick = () => {
    let natureHeroExisting = localStorage.getItem('natureHero');
    let natureHeroExistingObject = natureHeroExisting ? JSON.parse(natureHeroExisting) : {};
    natureHeroExistingObject.history = (natureHeroExistingObject.history || '') + 'ImgSlctd!';
    localStorage.setItem('natureHero', JSON.stringify(natureHeroExistingObject));
    navigate('/PaymentGateway');
  };

  return (
    <>
      <Header />
      <div className='wrapper'>
        <h2>Select a photo / एक फोटो चुनें</h2>
        <div className='filters'>
          <h2>Filters</h2>
          <select className='form-control' value={gender} onChange={handleGenderChange}>
            <option value=''>All</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <select className='form-control' value={ageRange} onChange={handleAgeRangeChange}>
            <option value=''>All</option>
            <option value='5-15'>5-15 years</option>
            <option value='16-30'>16-30 years</option>
            <option value='30-50'>30-50 years</option>
          </select>
        </div>
        <div className='choose-avatar'>
          {filteredImages.map((image, index) => (
            <div key={index} className={selectedImage === image.url ? 'remaker-image remaker-active' : 'remaker-image'}>
              <img
                src={image.imageUrl}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(image.url)}
              />
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className='cta-center'>
            <button onClick={handleClick}>Continue</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OriginalImages;
