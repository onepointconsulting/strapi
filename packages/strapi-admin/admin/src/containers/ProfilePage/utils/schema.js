import * as yup from 'yup';
import { translatedErrors } from 'strapi-helper-plugin';

const schema = yup.object().shape({
  firstname: yup.string().required(translatedErrors.required),
  lastname: yup.string().required(translatedErrors.required),
  email: yup
    .string()
    .email(translatedErrors.email)
    .required(translatedErrors.required),
  username: yup.string().nullable(),
  password: yup
    .string()
    .min(8, translatedErrors.minLength)
    .matches(/[a-z]/, 'components.Input.error.contain.lowercase')
    .matches(/[A-Z]/, 'components.Input.error.contain.uppercase')
    .matches(/\d/, 'components.Input.error.contain.number'),
  confirmPassword: yup
    .string()
    .min(8, translatedErrors.minLength)
    .oneOf([yup.ref('password'), null], 'components.Input.error.password.noMatch')
    .when('password', (password, passSchema) => {
      return password ? passSchema.required(translatedErrors.required) : passSchema;
    }),
});

export default schema;
