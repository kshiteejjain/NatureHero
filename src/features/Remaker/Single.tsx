import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Header from "../../components/Header/Header";
// import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from "react-share";

import './Single.css';

type JobStatus = {
  result?: {
    output_image_url?: string[] | undefined
  }
};

const Single = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(true);
  const navigate = useNavigate()

  useEffect(() => {
    let natureHero = localStorage.getItem('natureHero');
    let natureHeroObject = natureHero ? JSON.parse(natureHero) : {};
    let historyValue = natureHeroObject.history;
    if(historyValue !==  'strt&TrmsA?ImgSlctd!'){
      setIsAuthorized(false);
      setTimeout(() => { window.location.href = 'https://rzp.io/l/CK9bopcdc4' }, 2000)
    }
  }, []);


  const handleFileUpload = async (event: any) => {
    setIsLoading(true)
    try {
      const formData = new FormData();

      // Retrieve image path from localStorage
      let natureHero = localStorage.getItem('natureHero');
      let natureHeroObject = natureHero ? JSON.parse(natureHero) : {};
      let localStorageImagePath = natureHeroObject.selectedImage;
      if (!localStorageImagePath) {
        throw new Error('No image path found in localStorage');
      }

      // Fetch the image blob from the localStorage path
      const targetImageResponse = await fetch(localStorageImagePath);
      const targetImageBlob = await targetImageResponse.blob();
      formData.append('target_image', targetImageBlob, 'sample_avatar.png');

      // Append the swap image from the file input
      formData.append('swap_image', event.target.files[0]);

      const response = await fetch('https://developer.remaker.ai/api/remaker/v1/face-swap/create-job', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': import.meta.env.VITE_REMAKER_KEY,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error creating job');
      }
      setJobId(data?.result?.job_id);  // Assuming the response contains job_id
      setIsLoading(false)
    } catch (err: any) {
      console.error(err);
    }
  };


  const fetchJobStatus = async (jobId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://developer.remaker.ai/api/remaker/v1/face-swap/${jobId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': import.meta.env.VITE_REMAKER_KEY,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error fetching job status');
      }
      setJobStatus(data);  // Assuming the response contains the job status
      setIsLoading(false)
    } catch (err: any) {
      console.error(err);
    }
  };
  const downloadImage = async (url: string) => {
    try {
      localStorage.clear();
      const response = await fetch(url);
      const blob = await response.blob();
      const urlBlob = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = 'nature-hero.png'; // You can set a default file name or use the original file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlBlob);
    } catch (error: any) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <>
      <Header />
      {isLoading && <Loader />}
      {isAuthorized ? <>
        {!jobStatus && (
          <div className="upload-image">
            <input type="file" onChange={handleFileUpload} />
          </div>
        )}
        {jobId && !jobStatus && (
          <div className='cta-center'>
            <p>Image uploaded successfully, click continue</p>
            <button onClick={() => fetchJobStatus(jobId)}>Continue</button>
          </div>
        )}
        {jobStatus && jobStatus.result?.output_image_url && jobStatus.result.output_image_url.length > 0 && (
          <div className="result">
            <img src={jobStatus?.result?.output_image_url[0]} alt="Image Output" />
            <div className='cta-center'>
              <button
                className="button"
                onClick={() => {
                  if (jobStatus.result?.output_image_url) {
                    downloadImage(jobStatus.result.output_image_url[0]);
                  }
                }}
              >
                Download Image
              </button>
              <button className="btn-secondary" onClick={() => navigate('/')}>Home</button>
              {/* <FacebookShareButton url={jobStatus.result.output_image_url[0]} className="Demo__some-network__share-button">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton
                url={jobStatus.result.output_image_url[0]}
                title={'My title'}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton> */}
            </div>
          </div>
        )}
      </> : <div className="redirecting-payment">Access denied. Redirecting to payment page...</div>}
    </>
  )
}

export default Single;
