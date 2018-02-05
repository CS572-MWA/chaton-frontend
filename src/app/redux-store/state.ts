import { IUser } from './user';
import { IGroup } from './group';

export interface IAppState{
    user: IUser;
    groups: IGroup[];
}