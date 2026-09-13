import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface LoginCredentials {
  username: string;
  password: string;
  [key: string]: string;
}

export class CsvReader {
  static readRows<T = Record<string, string>>(relativeFilePath: string): T[] {
    const fullPath = path.resolve(process.cwd(), relativeFilePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    return parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as T[];
  }

  static getLoginCredentials(
    relativeFilePath: string = 'test-data/login-credentials.csv',
    rowIndex: number = 0,
  ): LoginCredentials {
    const rows = this.readRows<LoginCredentials>(relativeFilePath);

    if (!rows[rowIndex]) {
      throw new Error(
        `No login credentials found at row ${rowIndex} in ${relativeFilePath}`,
      );
    }

    return rows[rowIndex];
  }
}