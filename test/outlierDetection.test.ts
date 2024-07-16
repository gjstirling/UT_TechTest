import {outlierDetection} from "../src/services/outlierDetection.ts";

describe('outlierDetection', () => {
    test('it should resolve with data without outliers', async () => {
        const data = [
            { Value: 10 },
            { Value: 12 },
            { Value: 11 },
            { Value: 13 },
            { Value: 9 },
            { Value: 10 },
            { Value: 12 },
            { Value: 11 },
            { Value: 13 },
            { Value: 10 }
        ];

        await expect(outlierDetection(data)).toBe(false);
    });

    test('it should reject with data with outliers', async () => {
        const data = [
            { Value: 10 },
            { Value: 12 },
            { Value: 11 },
            { Value: 13 },
            { Value: 9 },
            { Value: 10 },
            { Value: 12 },
            { Value: 11 },
            { Value: 100 },
            { Value: 10 }
        ];

        await expect(outlierDetection(data)).toBe(true)
    });
})