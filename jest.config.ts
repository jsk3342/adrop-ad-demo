import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.jest.json",
            },
        ],
    },
};

export default config;
