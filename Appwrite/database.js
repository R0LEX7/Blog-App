/* The above class is a JavaScript service class that interacts with the Appwrite backend to perform CRUD operations on
posts and handle file uploads. */

import { Client, Databases, ID, Storage, Query } from "appwrite";
import config from "../Config/config";

export class Service {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    slug,
    title,
    content,
    featuredImg,
    userId,
    status,
    author,
  }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          userId,
          status,
          author,
        }
      );
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  /** file upload service */

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite " + error.message);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const appwriteService = new Service();

export default appwriteService;
