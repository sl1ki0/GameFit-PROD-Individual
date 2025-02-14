export interface UserData {
    username: string;
    gender: 'Male' | 'Female';
    weight: number;
    height: number;
    sportActivity: number;
}

export interface FirstFormValues {
    username: string;
    gender: string;
  }
  
  export interface SecondFormValues {
    weight: number | null;
    height:  number | null;
    sportActivity:  number | null;
  }
  