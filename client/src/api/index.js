import Auth from './Auth';
import User from './User';
import Conversation from './Conversation';
import Message from './Message';

export const authApi = new Auth();
export const userApi = new User();
export const conversationApi = new Conversation();
export const messageApi = new Message();
