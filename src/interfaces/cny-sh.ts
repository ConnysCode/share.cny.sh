export interface ICnyShResponse<T> {
  success: boolean;
  content: T;
  message: string;
}

export interface ICnyShRedirect {
  redirect: string;
  key: string;
  url: string;
}
