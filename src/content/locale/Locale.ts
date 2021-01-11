type StringWithPlaceHolder<T extends string> = `${string}${T}${string}`;

export interface Locale {
  home: string;
  blog: string;
  about: string;
  contact: string;
  helloMessage: StringWithPlaceHolder<'name'>;
  welcomeMessage: string;
  jobDescription: string;
  bio: string;
  aboutMe: string;
  [key: string]: string;
}
