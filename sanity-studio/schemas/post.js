export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Photo',
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes',
      name: 'likes',
      type: 'array', // 해당 post를 좋아한 사용자들
      of: [{type: 'reference', to: [{type: 'user'}]}],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document', // comment는 post와 독립적일 일이 거의 없기 때문에 post.js안에 정의하고자 함
          fields: [
            {title: 'Author', name: 'author', type: 'reference', to: [{type: 'user'}]},
            {
              title: 'Comment',
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo',
    },
    prepare(selection) {
      const {title, authorName, authorUsername, media} = selection // 데이터 가공 - 객체형태로 전달
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media,
      }
    },
  },
}
