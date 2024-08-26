import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

export const uploadPhoto = async (file, userId) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${userId}-${Date.now()}-${filename}`;

  const upload = new Upload({
    client: new S3Client({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRETE,
      },
    }),
    params: {
      Bucket: "instaclone-uploads-dudu",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    },
  });

  return upload.done().then((data) => data.Location);
};
