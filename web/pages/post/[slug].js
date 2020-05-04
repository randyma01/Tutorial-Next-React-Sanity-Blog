// post.js

// [slug].js

import { useRouter } from 'next/router';

import client from '../../client.js';

const Post = (props) => {
  const { title = 'Missing title', name = 'Missing name' } = props;
  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
    </article>
  );
};

Post.getInitialProps = async function (context) {
  const { slug = '' } = context.query;
  return await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]{title, "name": author->name}
  `,
    { slug }
  );
};

/* Post.getInitialProps = async function (context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query;
  return await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
  `,
    { slug }
  );
};
 */
export default Post;
