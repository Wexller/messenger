import { eventBus } from '@/main';
import { TOAST } from '@/constants';

export default (ctx) => {
  eventBus.$on('toast', ({ type = TOAST.NOTIFICATION, title = 'Notification', message = '' }) => {
    const options = {
      title,
    };

    if (type === TOAST.ERROR) {
      options.variant = 'danger';
      options.toaster = 'b-toaster-bottom-center';
    }

    ctx.$bvToast.toast(message, options);
  });
};
