import { gql } from "apollo-server-express";
import { Comment } from "@prisma/client";
export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    likes: Int!
    commentNumber: Int!
    comments: [Comment]
    isMine: Boolean!
    isLiked: Boolean!
  }

  type Hashtag {
    id: String!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: String!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
