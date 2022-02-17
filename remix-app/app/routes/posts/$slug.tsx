import { useLoaderData } from "remix"
import type { LoaderFunction } from "remix"
import invariant from "tiny-invariant"
import { getPost } from "~/post"

export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.slug, "expected params.slug")
    return getPost(params.slug)
}

export default function PostSlug() {
    const slug = useLoaderData();
    return (
        <div>
            <h1>Some Post: {slug}</h1>
        </div>
    )
}