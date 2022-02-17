import { useLoaderData } from "remix"
import {Link} from "@remix-run/react"
import {getPosts} from "~/post"
import type {Post} from "~/post"

export const loader = async () => getPosts()

export default function Posts() {
    const posts = useLoaderData();
    console.log(posts);
    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(({slug, title}: Post) => (
                    <li key={slug}>
                        <Link to={slug}>{title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}