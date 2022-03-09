const retrieveColour = (template, auxillaryLift) => {
    if (template === 'A2SHypertrophy')
    {
        if (!auxillaryLift) {
            return '#018016'
        }
        else {
            return '#34eb71'
        }
    }
    if (template === 'A2SRepsThenSets') {
        if (auxillaryLift){
            return '#eb4034'
        }
        else {
            return '#fa4343'
        }
    }
};

export default retrieveColour;
