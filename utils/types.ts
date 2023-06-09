export type LoginDataType = {
    email:string;
    password:string;
  }
  
export type AuthUser = {
    user: UserData | null;
    token: string | null;
  };
  
export type AuthContextProps = {
    authUser: AuthUser;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>>;
    user: UserData | null;
  };
  
export type AuthProviderProps = {
    children: React.ReactNode;
  };

export type UserData = {
    id: any;
    status?: boolean;
    user?: {
      id?: number;
      email?: string;
      name?: string;
      googleId?: string;
      bio?: string;
      status?: number;
      createdAt?: string;
      updatedAt?: string;
      deletedAt?: string;
      token: string;
    };
  }

export type ChannelData = {
  id: any;
  name?: string;
	type?: string ;  
  user?: {
    id?: number;
    token?: string;
	}
	created_at? : string;
}
export interface MessageDisplayProps {
  messages: string[];
}

export type MessageInputProps = {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  disabled: boolean;
};

export interface Channel {
  id: number;
  name: string;
  type: string;
  user_id: number;
  created_at: string;
}

export type newChannel = {
  name: string;
  type: string;
  members: string;
};

export interface CreateChannelProps {
  userData: {
    token: string;
  };
}
