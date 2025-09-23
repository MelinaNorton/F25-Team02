import { UserRole } from "../resources/user.enum";

export interface User {
  id: string;               
  username: string;
  passwordHash: string;      
  name: string;
  role: UserRole;
  bio?: string;
  address?: string;
  email: string;
  phone?: string;
  profilePicUrl?: string;
  backupEmail?: string;
  securityQuestion?: string;
  securityQuestionAnswer?: string;
  points: number;
  archived: boolean;
}