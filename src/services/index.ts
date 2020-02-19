import crypto from 'crypto';

export const hash = async (key: string) => {
    const sha = crypto.createHash('sha1');
    sha.update(key);
    return sha.digest('base64');
}


