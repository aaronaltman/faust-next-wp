import { getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';
import Link from 'next/link';
import './globals.css';


export default async function Home() {
  let client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            uri
            slug
          }
        }
      }
    `,
  });

  return (
    <main>
      <h2 className='text-center font-bold hover:font-thin'>Posts</h2>
      <ul>
        {data.posts.nodes.map((post) => (
          <li className='text-center prose'>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
