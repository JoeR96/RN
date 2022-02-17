import A2SHT from '../../DailyWorkoutView/WorkoutTemplates/A2SHypertrophyExerciseForm'
import A2SRTS from '../../DailyWorkoutView/WorkoutTemplates/A2SSetsThenRepsExerciseForm'

const retrieveTemplate = (template) => {
    if (template === 'A2SHypertrophy') {
        return A2SHT
    }
    if (template === 'A2SRepsThenSets') {
        return A2SRTS
    }
};

export default retrieveTemplate;
