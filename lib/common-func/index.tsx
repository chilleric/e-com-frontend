export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64');
};

export const encodeBase64Url = (data: string) => {
  return Buffer.from(data).toString('base64url');
};

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

export const generateToken = (content: {
  userId: string;
  deviceId: string;
}) => {
  var jwt = require('jsonwebtoken');

  const contentJwt = {
    ...content,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000 + 60 * 60),
  };

  var token = jwt.sign(
    contentJwt,
    process.env.NEXT_PUBLIC_SECRET_JWT_KEY || '',
    {
      algorithm: 'HS512',
    },
  );

  return `Bearer ${token}`;
};
