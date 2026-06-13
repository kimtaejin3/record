import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/post-article";
import { getAllSlugs, getPost } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllSlugs("notes").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("notes", slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost("notes", slug);
  if (!post) notFound();
  return <PostArticle post={post} />;
}
