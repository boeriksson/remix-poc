import path from "path"
import fs from "fs/promises"
import parseFrontMatter, {FrontMatterResult} from "front-matter"
import invariant from "tiny-invariant";

export type Post = {
    slug: string;
    title: string;
}

export type PostMarkdownAttributes = {
    title: string;
}

const postsPath = path.join(__dirname, "..", "posts");

const isValidPostAttributes = (attributes: any): attributes is PostMarkdownAttributes =>
    attributes?.title

export async function getPosts() {
    const dir = await fs.readdir(postsPath)
    return Promise.all(
        dir.map(async filename => {
            const file = await fs.readFile(
                path.join(postsPath, filename)
            );
            const {attributes} = parseFrontMatter(
                file.toString()
            );
            invariant(
                isValidPostAttributes(attributes),
                `${filename} has bad meta data!`
            )
            return {
                slug: filename.replace(/\.md$/, ""),
                title: attributes.title
            }
        })
    )
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes } = parseFrontMatter(file.toString());
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  return { slug, title: attributes.title };
}