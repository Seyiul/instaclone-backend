import { Hashtag } from "@prisma/client";

export const makeHashtags = (caption) => {
  const hashtags = caption.match(/#[\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g) || [];

  return hashtags.map((hashtag: Hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
