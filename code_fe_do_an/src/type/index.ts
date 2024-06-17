export type AlphabetResponse = {
  alphabet_id: number;
  type_id: number;
  japanese_character: string;
  romaji_character: string;
  alphabet_audio: string;
  alphabet_image: string;
};

export type CourseResponse = {
    course_id: number;
    course_name: string;
    description: string;
    course_image: string;
    week: number;
};
