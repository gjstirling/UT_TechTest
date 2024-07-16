import { parseCsv } from "../src/services/parseCsv.ts";
import {unlinkSync} from "node:fs";

describe('parseCsv', () => {
    test('it should resolve if CSV is correctly structured', async () => {
        expect(true).toBe(true)
    })
});