import { IUser } from './userInterface';
export interface ISchool {
    _id: string;
    schoolName: string;
    user: IUser;
    deleted: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    urlPlus?: string;
}
