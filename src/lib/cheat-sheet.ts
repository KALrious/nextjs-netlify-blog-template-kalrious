import fs from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import path from 'path';

const cheatSheetDirectory = path.join(process.cwd(), 'content/cheat-seets');

let cache;

export function fetchContent() {
  if (cache) {
    return cache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(cheatSheetDirectory);
  const allCheatSheetsData = fileNames
    .filter(it => it.endsWith('.mdx'))
    .map(fileName => {
      // Read markdown file as string
      const fullPath = path.join(cheatSheetDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: s => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        title: string;
        slug: string;
        fullPath: string;
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, '');

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error('slug field not match with the path of its content source');
      }

      return matterData;
    });
  // Sort posts by date
  cache = allCheatSheetsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return cache;
}

export function countContent(tag?: string): number {
  return fetchContent().filter(it => !tag || (it.tags && it.tags.includes(tag))).length;
}

export function listContent(page: number, limit: number, tag?: string) {
  return fetchContent()
    .filter(it => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
