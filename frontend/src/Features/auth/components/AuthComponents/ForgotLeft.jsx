import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

import '../../styles/Forgot/ForgotLeft.scss'

const ForgotLeftPart = ({ title1, title2, description1, description2, cardData, image,back }) => {

  return (
    <div className="forgot-left">
      <div className="forgot-left-container">

        {image && (
          <div className="left-image">
            <img src={image} alt="illustration" />
          </div>
        )}

        <div className="forgot-title-section">
          <h2 className="welTitle">
            {title1} <span className="backTitle">{title2}</span>
          </h2>

          <p className="forgot-description">
            {description1}
            {description2 && (
              <>
                <br />
                {description2}
              </>
            )}
          </p>
        </div>

        <div className="forgot-properties">
          {cardData.map((item) => {
            const Icon = item.icon;

            return (
              <div className="property" key={item.id}>
                <span className="p-icon">
                  <Icon />
                </span>
                <p className="p-title">{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* back btn code here */}

        {
          back && (
            <>
              <div className="back-btn">
                <ArrowLeft /> Back to <Link to={'/login'}>Login</Link>
              </div>
            </>
          )
        }

      </div>
    </div>
  );
};

export default ForgotLeftPart
