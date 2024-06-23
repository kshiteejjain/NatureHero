import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';

import OriginalImage1 from '../../assets/originalimages/Lady_Bison.png';
import OriginalImage2 from '../../assets/originalimages/Lady_Deer.png';
import OriginalImage3 from '../../assets/originalimages/Lady_Deer2.png';
import OriginalImage4 from '../../assets/originalimages/Lady_Leapord.png';
import OriginalImage5 from '../../assets/originalimages/Lady_leopard2.png';
import OriginalImage6 from '../../assets/originalimages/Lady_Leopard3.png';
import OriginalImage7 from '../../assets/originalimages/Lady_SlothBear.png';
import OriginalImage8 from '../../assets/originalimages/Lady_Tiger.png';
import OriginalImage9 from '../../assets/originalimages/Man_Bison.png';
import OriginalImage10 from '../../assets/originalimages/Man_Eagle.png';
import OriginalImage11 from '../../assets/originalimages/Man_FlyCatcher.png';
import OriginalImage12 from '../../assets/originalimages/Man_Leapord.png';
import OriginalImage13 from '../../assets/originalimages/Man_SlothBear.png';
import OriginalImage14 from '../../assets/originalimages/Man_Tiger.png';

import lowResImage1 from '../../assets/lowresimages/Lady_Bison.png';
import lowResImage2 from '../../assets/lowresimages/Lady_Deer.png';
import lowResImage3 from '../../assets/lowresimages/Lady_Deer2.png';
import lowResImage4 from '../../assets/lowresimages/Lady_Leapord.png';
import lowResImage5 from '../../assets/lowresimages/Lady_leopard2.png';
import lowResImage6 from '../../assets/lowresimages/Lady_Leopard3.png';
import lowResImage7 from '../../assets/lowresimages/Lady_SlothBear.png';
import lowResImage8 from '../../assets/lowresimages/Lady_Tiger.png';
import lowResImage9 from '../../assets/lowresimages/Man_Bison.png';
import lowResImage10 from '../../assets/lowresimages/Man_Eagle.png';
import lowResImage11 from '../../assets/lowresimages/Man_FlyCatcher.png';
import lowResImage12 from '../../assets/lowresimages/Man_Leapord.png';
import lowResImage13 from '../../assets/lowresimages/Man_SlothBear.png';
import lowResImage14 from '../../assets/lowresimages/Man_Tiger.png';

const originalImages = [
  OriginalImage1, OriginalImage2, OriginalImage3, OriginalImage4, OriginalImage5, OriginalImage6, OriginalImage7,
  OriginalImage8, OriginalImage9, OriginalImage10, OriginalImage11, OriginalImage12, OriginalImage13, OriginalImage14
];

const lowResImages = [
  lowResImage1, lowResImage2, lowResImage3, lowResImage4,
  lowResImage5, lowResImage6, lowResImage7, lowResImage8,
  lowResImage9, lowResImage10, lowResImage11, lowResImage12, lowResImage13, lowResImage14
];

const OriginalImages = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>(originalImages);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImagePaths(lowResImages);
      } else {
        setImagePaths(originalImages);
      }
    };

    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize); // Add event listener for window resize

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener on unmount
    };
  }, []);

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

  const handleContinue = () => {
    let natureHeroExisting = localStorage.getItem('natureHero');
    let natureHeroExistingObject = natureHeroExisting ? JSON.parse(natureHeroExisting) : {};
    natureHeroExistingObject.history = (natureHeroExistingObject.history || '') + 'ImgSlctd!';
    localStorage.setItem('natureHero', JSON.stringify(natureHeroExistingObject));
    window.location.href = 'https://rzp.io/l/CK9bopcdc4'
  }

  return (
    <>
      <Header />
      <div className='wrapper'>
        <h2>Select a photo / एक फोटो चुनें</h2>
        <div className='choose-avatar'>
          {imagePaths.map((imagePath, index) => (
            <div key={index}
              className={selectedImage === imagePath ? 'remaker-image remaker-active' : 'remaker-image'}>
              <img
                src={imagePath}
                alt={`Image ${index + 1}`}
                onClick={() => handleImageClick(imagePath)}
              />
            </div>
          ))}
        </div>
        {selectedImage && (
          <div className='cta-center'>
            <button onClick={handleContinue}>Continue</button>
          </div>
        )}
      </div>
    </>
  );
}

export default OriginalImages;
