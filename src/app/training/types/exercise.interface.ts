export interface ExerciseInterface {
    id: string;
    name: string;
    duration: number;
    caloriesBurn: number;
    date?: Date;
    state?: 'completed' | 'cancelled' | null;
}