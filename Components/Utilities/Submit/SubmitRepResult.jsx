export const submit = () => {
    axios.put(url + 'WorkoutCreation/UpdateWorkOutResult', {
        id: exercise.ExerciseMasterId,
        reps: amrapResult,
        week: exercise.Week
    })
        .then(exercise.exerciseCompleted = true)
        .then(RemoveExercise(exercise.ExerciseOrder))
}