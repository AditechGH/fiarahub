import redis from 'redis';

const client = redis.createClient();


export const saveItem = async (hash: string, data: any, duration: number = 1440) => {
  client.set(hash, JSON.stringify(data));
  client.expire(hash, duration);
}

export const getItem = (hash: string) => {
  return new Promise((resolve, reject) => {
      client.get(hash, async (err, data) => {
          if(err) reject(err)
          resolve(JSON.parse(data));
      });
  });
}

export const saveData = async (hash: string, data: any) => {
   client.hmset(hash, data);
}

export const getData = (hash: string) => {
  return new Promise((resolve, reject) => {
      client.hgetall(hash, async (err, data) => {
          if(err) reject(err)
          resolve(data);
      });
  });
}


export const remove = async (hash: string) => {
  return new Promise((resolve, reject) => {
      client.del(hash, (err, response) => {
          if(err) reject(err)
          resolve(response);
      })
  });
}

export const exists = async (hash: string) => {
  return new Promise((resolve, reject) => {
    client.exists(hash, (err, response) => {
        if(err) reject(err)
        resolve(response);
    })
  });
}
