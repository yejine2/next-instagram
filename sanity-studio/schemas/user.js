// https://www.sanity.io/docs/schema-types
export default {
  title: 'User', // sanify studio UI상의 이름
  name: 'user',
  type: 'document',
  fields: [
    // id 개념
    {
      title: 'Username',
      name: 'username', // DB 접근 이름, key,
      type: 'string', // name 데이터 타입은 string
    },
    // 유저의 실제 이름
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [
        // 배열인데 user를 참고하는 배열
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(), // 중복제거
    },
    {
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'name', // user schema key
      subtitle: 'username',
    },
  },
}
