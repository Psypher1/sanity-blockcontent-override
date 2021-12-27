// import sanityClient from "../../../utils/sanityClient";
import sanityClient from "@utils/sanityClient";
import groq from "groq";
import Link from "next/link";

const query = groq`*[_type == 'post' ]  | order(publishedAt desc){
    publishedAt,
    _id,
    title,
    'slug': slug.current,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    } 
  }`;

export async function getStaticProps() {
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
}
export default function Blog({ posts }) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-full py-16">
      <h1 className="text-4xl text-violet-700 mb-12  border-b-2 border-violet-900">
        Blog Page
      </h1>
      <div>
        {posts.map((post) => (
          <article key={post.slug} className="mb-8">
            <Link href={`/blog/${post.slug}`}>
              <a className="text-xl text-indigo-700 font-semibold hover:underline ">
                {post.title}
              </a>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
