import sanityClient from "@utils/sanityClient";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import PortableText from "react-portable-text";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export async function getStaticPaths() {
  const posts = await sanityClient.fetch(`*[_type == 'post']{
        'slug': slug.current}
        `);

  // map through slugs and output them
  const paths = posts.map(({ slug }) => `/blog/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const [post] =
    await sanityClient.fetch(`*[_type == 'post' && slug.current == '${slug}']{
      title,
      _id,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      'author': author->name,
      'authorImage': author->image,
      body,
      
    }`);

  // console.log(post);
  return {
    props: { post },
  };
}
// THIS USES PORTABLE TEXT
const Heading = ({ children }) => (
  <h2 className="text-red-500 text-4xl mb-4">{children}</h2>
);

const Paragraph = ({ children }) => (
  <p className="text-md mb-6 leading-relaxed">{children}</p>
);

export default function PostPage({ post }) {
  return (
    <div className="container mx-auto p-20">
      {/* <h1 className="text-xl font-bold mb-12 text-violet-500">Post Page</h1> */}

      <article>
        <img src={urlFor(post.mainImage).url()} alt={post.title} />
        <h3 className="text-3xl mb-8 font-semiold">{post.title}</h3>

        <hr className="mb-4" />
        <div className="">
          <PortableText
            content={post.body}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            {...sanityClient.config()}
            serializers={{ h2: Heading, normal: Paragraph }}
          />
        </div>
        <hr className="my-8" />
        <div className="flex items-center space-x-4">
          <img
            className=" rounded-full w-12 h-12"
            src={urlFor(post.authorImage).url()}
            alt={post.author}
          />
          <p className="text-lg">{post.author}</p>
        </div>
      </article>
    </div>
  );
}

// ===== THIS USES BLOCK_CONTENT =======
// const overrides = {
//   h2: (props) => <h2 className="text-red-600 text-4xl mb-4" {...props} />,
//   p: (props) => <p className="text-blue-400" {...props} />,
// };
// const serializers = {
//   types: {
//     block: (props) =>
//       // Check if we have an override for the “style”
//       overrides[props.node.style]
//         ? // if so, call the function and pass in the children, ignoring
//           // the other unnecessary props
//           overrides[props.node.style]({ children: props.children })
//         : // otherwise, fallback to the provided default with all props
//           BlockContent.defaultSerializers.types.block(props),
//   },
// };

// export default function PostPage({ post }) {
//   return (
//     <div className="container mx-auto p-20">
//       {/* <h1 className="text-xl font-bold mb-12 text-violet-500">Post Page</h1> */}

//       <article>
//         <img src={urlFor(post.mainImage).url()} alt={post.title} />
//         <h3 className="text-3xl mb-8 font-semiold">{post.title}</h3>

//         <hr className="mb-4" />
//         <div className="">
//           <BlockContent
//             blocks={post.body}
//             imageOptions={{ w: 320, h: 240, fit: "max" }}
//             {...sanityClient.config()}
//             serializers={serializers}
//           />
//         </div>
//         <hr className="my-8" />
//         <div className="flex items-center space-x-4">
//           <img
//             className=" rounded-full w-12 h-12"
//             src={urlFor(post.authorImage).url()}
//             alt={post.author}
//           />
//           <p className="text-lg">{post.author}</p>
//         </div>
//       </article>
//     </div>
//   );
// }
