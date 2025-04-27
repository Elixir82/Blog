import conf from "../conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

class config {
  client = new Client;
  databases;
  storage;
  constructor() {
    this.client.setProject(conf.appwriteprojectid);
    this.client.setEndpoint(conf.appwriteapiendpoint);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredimage, status, userId }) {
    try {
      return await this.databases.createDocument(conf.appwritedatabaseid, conf.appwritecollectiontid, slug, {
        title,
        content,
        featuredimage,
        status,
        userId
      })
    } catch (error) {
      console.log("Create Post throws error");
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(conf.appwritedatabaseid, conf.appwritecollectiontid, slug, {
        title, content, featuredimage, status
      })
    } catch (error) {
      console.log("Update Post throws error");
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(conf.appwritedatabaseid, conf.appwritebucketid, slug);
    } catch (error) {
      console.log("Delete Post throws error");
      throw error;
    }
  }

  async getPost(slug) {
    try {
      // console.log(slug);
      return await this.databases.getDocument(conf.appwritedatabaseid,conf.appwritecollectiontid,slug); 
    } catch (error) {
      console.log("Get post throws an error");
      throw error;
    }
  }
    async getPosts(queries=[Query.equal("status","active")]){
      try {
        return await this.databases.listDocuments(conf.appwritedatabaseid,conf.appwritecollectiontid,queries)
      } catch (error) {
        console.error("Failed to fetch posts");
        throw error;
      }
    }

    //file upload services

    async uplaodFile(file){
      try {
        return await this.storage.createFile(conf.appwritebucketid,ID.unique(),file);
      } catch (error) {
        console.log("Upload Image throws an error");
        throw error;
      }
    }

    async deleteFile(fileId){
      try {
        await this.storage.deleteFile(conf.appwritebucketid,fileId);
      } catch (error) {
        console.log("Delete Image throws error");
        throw error;
      }
    }

    getFilePreview(fileId){
      try {
        return this.storage.getFilePreview(conf.appwritebucketid,fileId);
      } catch (error) {
        console.log("Upload Image throws error");
        throw error;
      }
    }
}

let confservices=new config();
export default confservices;

