import * as _ from 'lodash';

const sizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

const getLinkToProfilePhoto = (profile, size = sizes.MEDIUM) => {
  if (!_.get(profile, 'photo')) {
    return '/images/avatar.png';
  }

  return `/api/v1/images/${profile.photo}?size=${size}`;
};

export {
  sizes,
  getLinkToProfilePhoto
}
