export interface IUser {
    _id?: Date;
    lastName: string;
    firstName: string;
    schoolName:string;
    email: string;
    username: string;
    role: string;
    nomRole:string;
    password: string;
    deleted: boolean;
    date: Date;
    photo: string;
    categorie: string;
    urlPlus?: string;
    isArchive: boolean;
  }
  