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
        number: process.env.TWILLIO_NUMBER || '',
        accountSid: process.env.TWILLIO_accountSid || '',
        authToken: process.env.TWILLIO_authToken || '',
        authyKey: process.env.TWILLIO_authyKey|| '',
    },
    no_reply: 'no_reply@halalclothingonline.com',
    amazon: {
        AccessKeyID: process.env.AMAZON_AccessKeyID || '',
        SecretAccessKey: process.env.AMAZON_SecretAccessKey || '',
        region: process.env.AMAZON_region || ''
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
