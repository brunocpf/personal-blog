import PostMetadata from './PostMetadata';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getForLocale = (locale: string) => {
  const basePath = path.join('src', 'content', locale);

  async function parseFile(filePath: string) {
    const file = await fs.readFile(path.join(basePath, filePath));
    const fileContents = file.toString();
    const { data, content } = matter(fileContents);
    return {
      data: data as PostMetadata,
      content,
    };
  }

  return {
    async aboutMe() {
      return await parseFile('about-me.md');
    },
    async contact() {
      return await parseFile('contact.md');
    },
    async post(slug: string) {
      return await parseFile(path.join('blog', `${slug}.md`));
    },
    async slugs() {
      const files = await fs.readdir(path.join(basePath, 'blog'));
      return files.map(f => f.replace('.md', ''));
    },
    async posts(tags?: string[]) {
      const slugs = await this.slugs();

      const postsData = await Promise.all(
        slugs.map(async s => {
          const { data } = await this.post(s);
          return {
            slug: s,
            data: data as PostMetadata,
          };
        }),
      );

      const filteredPosts = postsData.filter(p =>
        tags ? p.data.tags.some(t => tags.includes(t)) : true,
      );

      const posts = filteredPosts.sort(
        (a, b) => b.data.date.getTime() - a.data.date.getTime(),
      );

      return posts;
    },
    async latestPosts(maxPosts: number = 9) {
      const allPosts = await this.posts();
      return allPosts.slice(0, maxPosts);
    },
    async tags() {
      const allPosts = await this.posts();
      const tags = allPosts
        .map(p => p.data.tags)
        .flat()
        .sort();
      return [...new Set(tags)];
    },
  };
};

export default getForLocale;
