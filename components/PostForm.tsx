import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetPosts } from "../hooks/useGetPosts.hooks";

type Inputs = {
	title: string;
	content: string;
};

export const PostForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const onSubmit = (data: any) => {
		axios
			.post("http://localhost:8000/api/posts/create", data)
			.then((res) => {
				alert("投稿完了しました");
				setTitle("");
				setContent("");
			})
			.catch((err) => console.log(err));
		reset();
	};

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	return (
		<div className="flex items-center justify-center">
			<div className="flex p-4 justify-center items-center border-2 border-solid border-gray-500 rounded-lg w-full md:w-1/4 mx-4">
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="mt-4 mb-6">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Title
						</label>
						<input
							defaultValue="test"
							{...register("title", { required: true, maxLength: 20 })}
							placeholder="Title"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
						/>
					</div>
					<div className="mb-6">
						<label className="block mb-2 text-sm font-medium text-gray-900">
							Content
						</label>
						<input
							{...register("content")}
							required
							placeholder="Content"
							className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
						/>
					</div>
					<div className="mt-6 mb-4">
						<Button type="submit">POST</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
