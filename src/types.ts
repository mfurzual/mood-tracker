export type Mood = 'Very Bad' | 'Bad' | 'Neutral' | 'Good' | 'Very Good';

export interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
}