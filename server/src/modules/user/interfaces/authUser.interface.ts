import IUser from './user.interface';

export default interface IAuthUser extends IUser {
  accessToken: string;
  refreshToken: string;
}
