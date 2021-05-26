import { configure, extend, setInteractionMode } from 'vee-validate';
import { required, confirmed } from 'vee-validate/dist/rules';

setInteractionMode('lazy');

configure({
  classes: {
    invalid: 'is-invalid',
  },
});

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('confirmed', {
  ...confirmed,
  message: "Confirmation password doesn't match",
});
