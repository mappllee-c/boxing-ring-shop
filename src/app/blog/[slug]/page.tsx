 import fs from 'fs';
  import path from 'path';
  import matter from 'gray-matter';
  import { notFound } from 'next/navigation';

  interface BlogPost {
    title: string;
    date: string;
    description: string;
    content: string;
  }

  interface Params {
    slug: string;
  }

  function getBlogPost(slug: string): BlogPost | null
  {
    try {
      const postsDirectory = path.join(process.cwd(),
  'content/blog');
      const fullPath = path.join(postsDirectory,
  `${slug}.md`);

      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath,
  'utf8');
      const { data, content } = matter(fileContents);

      return {
        title: data.title || 'タイトルなし',
        date: data.date || '',
        description: data.description || '',
        content: content
      };
    } catch (error) {
      return null;
    }
  }

  export default function BlogPostPage({ params }: {
  params: Params }) {
    const post = getBlogPost(params.slug);

    if (!post) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8
  max-w-4xl">
        <article className="prose lg:prose-xl
  mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold
  text-gray-900 mb-4">{post.title}</h1>
            {post.date && (
              <time className="text-gray-600 text-lg"
  dateTime={post.date}>
                {new
  Date(post.date).toLocaleDateString('ja-JP')}
              </time>
            )}
            {post.description && (
              <p className="text-xl text-gray-700 mt-4
   font-medium">{post.description}</p>
            )}
          </header>
          <div className="whitespace-pre-wrap
  text-gray-800 leading-relaxed">
            {post.content}
          </div>
        </article>
      </div>
    );
  }
