const required = (key: string) => {
  if (!process.env[key]) {
    throw new Error(`❌ Environment variable ${key} belum di set`);
  }

  return process.env[key];
};

const env = {
  app: {
    port: Number(process.env.PORT),
  },
  db: {
    host: required('DB_HOST'),
    port: Number(required('DB_PORT')),
    user: required('DB_USER'),
    password: required('DB_PASSWORD'),
    name: required('DB_NAME'),
  },
};

export default env;
