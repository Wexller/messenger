import axios from 'axios';
import { eventBus } from '@/main';
import { TOAST } from '@/constants';

const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

export default async (params) => {
  try {
    const { data } = await axiosInstance(params);
    return { ...data, success: true };
  } catch (e) {
    const message = e.response.data.message;

    eventBus.$emit('toast', {
      type: TOAST.ERROR,
      message,
      title: 'Something went wrong...',
    });

    return {
      success: false,
      message,
    };
  }
};
