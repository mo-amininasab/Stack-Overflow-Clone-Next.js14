"use client";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: 1,
    title: "Sample Question 1",
    tags: [
      { _id: "tag1", name: "JavaScript" },
      { _id: "tag2", name: "React" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "https://example.com/john-doe-picture.jpg",
    },
    upvotes: 42,
    views: 123,
    answers: [
      { answerId: "answer1", text: "Sample answer 1", author: "Jane Doe" },
      { answerId: "answer2", text: "Sample answer 2", author: "Bob Smith" },
    ],
    createdAt: new Date("2023-01-01T12:00:00Z"),
  },
  {
    _id: 2,
    title: "Sample Question 2",
    tags: [
      { _id: "tag3", name: "TypeScript" },
      { _id: "tag4", name: "Node.js" },
    ],
    author: {
      _id: "author2",
      name: "Jane Doe",
      picture: "https://example.com/jane-doe-picture.jpg",
    },
    upvotes: 5614245,
    views: 20435,
    answers: [
      { answerId: "answer3", text: "Sample answer 3", author: "Alice Johnson" },
      { answerId: "answer4", text: "Sample answer 4", author: "Charlie Brown" },
    ],
    createdAt: new Date("2023-02-15T10:30:00Z"),
  },
  {
    _id: 3,
    title: "Sample Question 3",
    tags: [
      { _id: "tag5", name: "HTML" },
      { _id: "tag6", name: "CSS" },
    ],
    author: {
      _id: "author3",
      name: "Bob Smith",
      picture: "https://example.com/bob-smith-picture.jpg",
    },
    upvotes: 30,
    views: 80,
    answers: [
      { answerId: "answer5", text: "Sample answer 5", author: "Eva Rodriguez" },
      { answerId: "answer6", text: "Sample answer 6", author: "David Johnson" },
    ],
    createdAt: new Date("2023-03-05T15:45:00Z"),
  },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          rout="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Questions and kickstart the discussion. our query could be the next big thing others lean from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
