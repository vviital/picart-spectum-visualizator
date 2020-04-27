import ReactDOM from 'react-dom';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import Typography from '@material-ui/core/Typography';

import 'react-image-crop/dist/ReactCrop.css';

import {sizes, getLinkToProfilePhoto} from './utils';

const noop = () => {};

class ProfileImage extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 100,
      aspect: 1,
    },
    previewURL: null,
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const {previewURL, blob} = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ previewURL });
      this.props.onImageCropped(blob);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.state.previewURL);
        resolve({
          previewURL: window.URL.createObjectURL(blob),
          blob,
        });
      }, 'image/jpeg');
    });
  }

  renderImageCrop() {


  }

  render() {
    const {isEditing, profile} = this.props;
    const { crop, previewURL, src } = this.state;

    const savedImage = getLinkToProfilePhoto(profile, sizes.LARGE);

    if (!isEditing) {
      return (<img src={savedImage} alt="Your avatar" className="profile-avatar" />);
    }

    return (
      <div>
        <div>
          <ReactCrop
            src={src || savedImage}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            className="profile-avatar"
          />

          {previewURL && (
            <div>
              <Typography
                variant="h5"
                align="center"
              >
                Preview
              </Typography>
              <img alt="Crop" className="profile-avatar" src={previewURL} />
            </div>
          )}
        </div>
        <div>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
      </div>
    );
  }
}

ProfileImage.defaultProps = {
  profile: {},
  isEditing: false,
  onImageCropped: noop
}

ProfileImage.propTypes = {
  profile: PropTypes.shape({
    photo: PropTypes.string
  }).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onImageCropped: PropTypes.func.isRequired,
}

export default ProfileImage;
