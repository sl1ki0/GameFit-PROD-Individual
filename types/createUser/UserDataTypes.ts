export interface UserData {
  username: string;
  gender: 'Male' | 'Female';
  age: number;
  weight: number;
  height: number;
  sportActivity: number;
}

export interface FirstFormValues {
  username: string;
  age: number | null;
  gender: string;
}

export interface SecondFormValues {
  weight: number | null;
  height: number | null;
  sportActivity: number | null;
}
