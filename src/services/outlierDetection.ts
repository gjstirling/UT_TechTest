export const outlierDetection = (results: Record<string, any>[]): boolean => {
    const numberOfValues = results.length;
    const sorted = results.sort((a, b) => a.Value - b.Value);
    const lowerQuartileIndex = Math.floor((numberOfValues - 1) * 0.25);
    const upperQuartileIndex = Math.floor((numberOfValues - 1) * 0.75);
    const lowerQuartile = sorted[lowerQuartileIndex].Value;
    const upperQuartile = sorted[upperQuartileIndex].Value;

    const interQuartileRange = upperQuartile - lowerQuartile;
    const lowerLimit = lowerQuartile - (interQuartileRange * 1.5);
    const upperLimit = upperQuartile + (interQuartileRange * 1.5);

    return results.some((num: Record<string, any>) => num["Value"] < lowerLimit || num["Value"] > upperLimit);
};