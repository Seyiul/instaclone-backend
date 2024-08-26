# Instaclone

### Instaclone Backend

## **What's Included?**

### Features

• ⚡ [React](https://ko.reactjs.org/) for Static Site Generator

• 🔥 Type checking [TypeScript](https://www.typescriptlang.org/)

• 🪢 Use query language for APIs with [GraphQL](https://graphql.org/) and manage data with [Apollo](https://www.apollographql.com/)

• 📐 Simplify interaction with database schemas and ensure type safety with [Prisma](https://www.prisma.io/)

• 🐘 Powerful, open-source relational database system with [PostgreSQL](https://www.postgresql.org/)

## Module

### User

- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Change Avatar (Image Upload)
- [x] Follow User
- [x] Unfollow User
- [x] See Followers and See Following w/ Pagination
- [x] Computed Fields
  ```
  데이터베이스에는 존재하지 않지만, graphQL Schema에는 존재하는 필드들을 의미한다. 매번 request를 받을 때마다 새롭게 계산되어 보여진다.
  ```
- [x] Search Users

### Photos

- [x] Upload Photo
- [x] See Photo
- [x] See Hashtags
- [x] Search Photos
- [x] Edit Photo
- [x] Like / Unlike Photo
- [x] See Photo Likes
- [x] See Feed
- [x] Delete Photo
- [x] See Photo Comments

### Comments

- [x] Comment on Photo
- [x] Edit Comment
- [x] Delete Comment

### Extras

- [x] S3 Image Upload

### DMs

- [ ] Create Room
- [ ] Get Room
- [ ] Send Message
- [ ] Realtime Messages

#### References

- [graphql Files Upload](https://www.apollographql.com/docs/apollo-server/v3/data/file-uploads/)
- [CORS error](https://www.apollographql.com/docs/apollo-server/security/cors/)
- [Prisma Pagination](https://www.prisma.io/docs/orm/prisma-client/queries/pagination)
- [Regex Test](https://www.regexpal.com/)
- [Compound Unique](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints)
- [Migrateing AWS SDK from v2 to v3 for S3](https://dev.to/sw360cab/migrating-aws-sdk-from-v2-to-v3-for-s3-32lh)
