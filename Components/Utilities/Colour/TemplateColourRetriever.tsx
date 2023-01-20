const retrieveColour = (template) => {
    if (template === 1)
    {
            return '#018016'
        
    }
    if (template === 2) {
            return '#eb4034'
    }

    if (template === 0) {
            return '#474233'
    }
};

export default retrieveColour;
enum exerciseTemplate
    {
        LinearProgression = 0,
        A2SHypertrophy = 1,
        A2SRepsThenSets = 2
    }