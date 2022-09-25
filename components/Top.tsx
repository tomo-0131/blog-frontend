import { Button, CloseButton, Loader } from "@mantine/core";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { useGetPosts } from "../hooks/useGetPosts.hooks";
import { PostForm } from "./PostForm";

interface Post {
	id: number;
	title: string;
	content: string;
}

export const Top = () => {
	const url = "http://localhost:8000/api/posts";
	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data: posts, error: isError } = useSWR(url, fetcher);

	if (isError) return <div>failed to load</div>;
	if (!posts)
		return (
			<div className="absolute top-[50%] left-[48%] md:left-[50%] transform translate-1/2">
				<Loader size="lg" variant="dots" />
			</div>
		);

	const deletePost = (id: any) => {
		axios
			.delete(`http://localhost:8000/api/posts/${id}`)
			.then((res) => {
				alert("削除しました");
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<div className="mx-auto text-center">
				<h1>ToDo</h1>
				<PostForm />
				<div className="flex justify-center items-center">
					<div className="mx-4 mt-8 w-full md:w-1/2 md:gap-4 border-[1px] grid sm:grid-cols-1 md:grid-cols-3">
						{posts.map((post: Post) => (
							<div key={post.id} className="border-2 border-solid mb-2">
								<CloseButton
									title="Close popover"
									size="xl"
									iconSize={20}
									onClick={() => deletePost(post.id)}
								/>
								<h2 className="-mt-6">{post.title}</h2>
								<p>{post.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
