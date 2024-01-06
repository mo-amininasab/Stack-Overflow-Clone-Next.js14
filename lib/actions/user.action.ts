"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser({
  clerkId,
  updateData,
  path,
}: UpdateUserParams) {
  try {
    connectToDatabase();

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser({ clerkId }: DeleteUserParams) {
  try {
    connectToDatabase();

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user form database and questions, answers, comments, etc.
    // get user question ids
    // const userQuestionsIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );
    // delete user questions
    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers({
  page = 1,
  pageSize = 20,
  filter,
  searchQuery,
}: GetAllUsersParams) {
  try {
    connectToDatabase();

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion({
  userId,
  questionId,
  path,
}: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      // remove questions from saved
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      // add question to saved
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions({
  clerkId,
  page = 1,
  pageSize = 10,
  filter,
  searchQuery,
}: GetSavedQuestionsParams) {
  try {
    connectToDatabase();

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if(!user) {
      throw new Error('User not found')
    }

    const savedQuestions = user.saved;

    return {questions: savedQuestions}
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo({userId}: GetUserByIdParams) {
  try {
    await connectToDatabase();

    const user = await User.findOne({clerkId: userId});
    if(!user) {
      throw new Error('User not found')
    }

    const totalQuestions = await Question.countDocuments({author: user._id})
    const totalAnswers = await Answer.countDocuments({author: user._id})

    return {user, totalQuestions, totalAnswers}
  } catch (error) {
    console.log(error);
    throw error;

  }
}

// export async function getAllUsers(params: GetAllUsersParams) {
//   try {
//     connectToDatabase();

//   } catch (error) {
//     console.log(error);
//     throw error;

//   }
// }
