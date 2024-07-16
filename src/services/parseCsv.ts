import {createReadStream, unlinkSync} from "node:fs";
import csvParser from "csv-parser";

export function parseCsv(data: string): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
        const results: Record<string, any>[] = [];

        createReadStream(data)
            .on('error', (err) => {
                console.error("Error parsing CSV:", err);
                reject("Error parsing CSV:")
            })

            .pipe(csvParser())
            .on('data', (row) => {
                if(!isNaN(row["Value"])) {
                    row["Value"] = parseFloat(row["Value"])
                }
                results.push(row)
            })
            .on('end', () => {
                unlinkSync(data);
                resolve(results)
            })
    })
}