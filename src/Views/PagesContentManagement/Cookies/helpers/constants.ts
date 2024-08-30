import {
  IMAGE_FILE_TYPES,
  INPUT_TYPES,
} from '../../../../Shared/constants/index';
import FORM_VALIDATION_MESSAGES from '../../../../Shared/constants/validationMessages';

const COOKIES_FORM_SCHEMA = {
  title: {
    type: INPUT_TYPES.TEXT,
    label: 'Title',
    className: 'col-md-12',
    placeholder: 'Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  description: {
    type: INPUT_TYPES.RICH_TEXT,
    label: 'Description',
    className: 'col-md-12',
    placeholder: 'Description',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
  image: {
    type: INPUT_TYPES.FILE,
    label: 'Header Image',
    className: 'col-md-12',
    accept: IMAGE_FILE_TYPES,
    placeholder: 'Header Image',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
    },
  },
  moreInformationTitle: {
    type: INPUT_TYPES.TEXT,
    label: 'More Information Title',
    className: 'col-md-12',
    placeholder: 'More Information Title',
    schema: {
      required: FORM_VALIDATION_MESSAGES().REQUIRED,
      minLength: {
        value: 3,
        message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH,
      },
    },
  },
};

export default COOKIES_FORM_SCHEMA;
