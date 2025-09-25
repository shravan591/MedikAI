
export type Language = 'en' | 'ta';

export interface UserInfo {
  name: string;
  age: string;
  gender: string;
  pastHistory: string;
}

export interface SymptomData {
  text: string;
  imageBase64: string | null;
}

export interface AnalysisResultData {
  assessment: string;
  suggestions: string[];
  isCritical: boolean;
  criticalityReason: string;
  disclaimer: string;
}

export interface PastAnalysis {
  id: string;
  date: string;
  userInfo: UserInfo;
  result: AnalysisResultData;
}
