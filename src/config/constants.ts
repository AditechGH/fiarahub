const appName = 'fiarahub';
const devConfig: any = {
    DATABASE: `${appName}`,
    HOST: 'localhost',
    DB_PORT: 3306,
    USERNAME: process.env.USERNAME || "root",
    PASSWORD: process.env.PASSWORD || "Aditek",
};

const testConfig: any = {
  DATABASE: `${appName}`,
  HOST: 'localhost',
  DB_PORT: 3306,
  USERNAME: process.env.USERNAME || "root",
  PASSWORD: process.env.PASSWORD || "Aditek",
};

const prodConfig: any = {
  DATABASE: `${appName}`,
  HOST: 'localhost',
  DB_PORT: 3306,
  USERNAME: process.env.USERNAME || "root",
  PASSWORD: process.env.PASSWORD || "Aditek",
};

const defaultConfig = {
    APP_NAME: appName,
    PORT: process.env.PORT || 3000,
    REDIS_PORT: process.env.REDIS_PORT || 6379,
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_AUTH: process.env.REDIS_AUTH || null,
    twilio: {
        number: process.env.TWILLIO_NUMBER || '+12057429662',
        accountSid: process.env.TWILLIO_accountSid || 'AC8a5fea6fb2f049b05bcbf3eaf330c38d',
        authToken: process.env.TWILLIO_authToken || 'b7bd7d0c620a0342b8a16bd0dfefde88',
        authyKey: process.env.TWILLIO_authyKey|| 'eXzYv8A8y5pn6q8W2taH67zBqhqsDtug',
    },
    no_reply: 'no_reply@halalclothingonline.com',
    amazon: {
        AccessKeyID: process.env.AMAZON_AccessKeyID || 'AKIAJRZ5NEHVHRBCCRQA',
        SecretAccessKey: process.env.AMAZON_SecretAccessKey || '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',
        region: process.env.AMAZON_region || 'us-east-1'
    }
};

const envConfig = (env: any) => {
    switch (env) {
        case "development":
            return devConfig;
        case "test":
            return testConfig;
        default:
            return prodConfig;
    }
}

export default {
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV),
};
