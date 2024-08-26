import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type Mutation {
    uploadPhoto(file: Upload!, caption: String): Photo
  }
`;
