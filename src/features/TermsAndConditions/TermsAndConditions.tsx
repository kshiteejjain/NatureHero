import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

import './TermsAndConditions.css';

const TermsAndConditions = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="terms">
                <h2>Terms And Conditions</h2>
                <p>Welcome to our AI-powered application provided by VYE (Visionary Young Engineers) designed for generating personalized “Hero” images featuring institution branding. By using our application, you agree to the following terms and conditions:</p>

                <h3>1. Purpose of the Application:</h3>
                <p> - Our application is intended for creating personalized images with institution branding.</p>
                <p>- Users are encouraged to share their generated images on social media, thereby enhancing institutional visibility.</p>

                <h3>2. User Consent:</h3>
                <p> - By uploading a photo, the user grants us permission to use the photo solely for the purpose of AI-based image generation.</p>

                <h3>3. Image Processing and Storage:</h3>
                <p> - No photos uploaded by users are stored once processing is completed.</p>
                <p>- The processed generated image remains on our servers for up to 24 hours for user retrieval and is automatically deleted thereafter.</p>

                <h3>4. Data Security:</h3>
                <p>- We take user privacy seriously and employ industry-standard measures to safeguard uploaded photos and generated images.</p>

                <h3>5. Ownership and Usage Rights:</h3>
                <p>- Users retain ownership of their uploaded photos.</p>
                <p> - The institution retains the right to use the generated images for promotional and marketing purposes related to the application.</p>

                <h3>6. Prohibited Uses:</h3>
                <p> - Users may not upload photos that contain offensive, copyrighted, or illegal material.</p>
                <p>- The application shall not be used for any unlawful purposes.</p>

                <h3>7. Disclaimer:</h3>
                <p> - While we strive for accuracy and quality in image generation, we do not guarantee perfection or exact likeness in the generated images.</p>

                <h3>8. Modifications:</h3>
                <p>- These terms and conditions may be updated from time to time. Users will be notified of any changes.</p>

                <h3>9. Acceptance:</h3>
                <p> - By uploading a photo to our application, you acknowledge that you have read and agree to these terms and conditions.</p>

                <h3>10. Contact: </h3>
                <p> - For any inquiries regarding these terms and conditions or the use of our application, please contact us at [contact information].</p>

                <p> These terms and conditions govern your use of our application. Please read them carefully before using our services. By using our application, you signify your agreement to these terms.</p>
            </div>
            <div className='back-btn'>
                <button className="btn-secondary" onClick={()=> navigate('/')}>Home</button>
            </div>
        </>
    )
};
export default TermsAndConditions;
