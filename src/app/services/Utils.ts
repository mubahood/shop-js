import { BASE_URL, DB_LOGGED_IN_PROFILE, DB_TOKEN } from "../../Constants";
import { ProfileModel } from "../models/ProfileModel";
import { http_get } from "./Api";

class Utils {
  static async update_logged_in_user() {
    var resp = null;

    try {
      resp = await http_get("users/me");
    } catch (error) {
      return;
    }
    if (resp == null) {
      return;
    }
    if (resp == undefined) {
      return;
    }
    if (resp == "undefined") {
      return;
    }
    if (resp == "") {
      return;
    }
    //check if resp.code is set
    if (resp.code == null) {
      return;
    }
    if (resp.code == undefined) {
      return;
    }
    if (resp.code != 1) {
      return;
    }

    if (resp.data == null) {
      return;
    }
    if (resp.data == undefined) {
      Utils.saveToDatabase(DB_TOKEN, null);
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, null);
      return;
    }
    if (resp.data == "undefined") {
      //logout user by delete token and profile
      Utils.saveToDatabase(DB_TOKEN, null);
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, null);

      return;
    }
    if (resp.data == "") {
      return;
    }

    // Utils.saveToDatabase(DB_TOKEN, token);
    try {
      Utils.saveToDatabase(DB_LOGGED_IN_PROFILE, resp.data);
    } catch (error) {
      alert("" + error);
    }

    var local_user_data = Utils.loadFromDatabase(DB_LOGGED_IN_PROFILE);

    if (
      local_user_data == null ||
      local_user_data == undefined ||
      local_user_data == "undefined" ||
      local_user_data == ""
    ) {
      alert("local_user_data is null");
      return;
    }
    console.log("local_user_data", local_user_data);
    return local_user_data;
  }
  static formatDateTime(interview_scheduled_at: string) {
    var date = new Date(interview_scheduled_at);
    return date.toLocaleString();
  }

  static initials(name: string | null | undefined): string {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(
        0
      )}`.toUpperCase();
    }
    return "";
  }

  //formatDate
  static formatDate(date: string) {
    var d = new Date(date);
    return d.toLocaleDateString();
  }

  // Convert an object to JSON string
  static toJson(obj: any) {
    return JSON.stringify(obj);
  }

  //delay static function that takes seconds
  static delay = (seconds: number) =>
    new Promise((resolve) => setTimeout(resolve, seconds * 1000));

  // Convert a JSON string to an object
  static fromJson(jsonStr: any, Model: any) {
    const obj = JSON.parse(jsonStr);
    return new Model(obj);
  }

  // Convert a list of objects to a JSON string
  static toJsonList(objList: any) {
    return JSON.stringify(objList);
  }

  // Save an object to the local database
  static saveToDatabase(local_path: any, obj: any) {
    if (obj === null) {
      return;
    }
    if (obj === undefined) {
      return;
    }
    if (obj === "undefined") {
      return;
    }
    try {
      localStorage.setItem(local_path, JSON.stringify(obj));
    } catch (error) {
      return;
    }
  }

  // Load an object from the local database by id
  static loadFromDatabase(DB_PATH = "") {
    // load from local db
    var data = localStorage.getItem(DB_PATH);
    if (data === null) {
      return null;
    }
    if (data === undefined) {
      return null;
    }
    if (data === "undefined") {
      return null;
    }
    if (data === "") {
      return null;
    }
    var results = null;
    try {
      results = JSON.parse(data);
    } catch (error) {
      return null;
    }
    return results;
  }

  // Generate a unique identifier
  static generateUniqueId() {
    return "_" + Math.random().toString(36).substring(2, 11);
  }

  //save profile
  static saveProfile(profile: ProfileModel) {
    try {
      const lsValue = JSON.stringify(profile);
      localStorage.setItem(DB_LOGGED_IN_PROFILE, lsValue);
    } catch (error) {
      alert("" + error);
    }
  }

  static img(url: any) {
    var default_img = BASE_URL + "/storage/images/default.png";
    if (url === null) {
      return default_img;
    }
    if (url === undefined) {
      return default_img;
    }
    if (url === "undefined") {
      return default_img;
    }
    if (url === "") {
      return default_img;
    }
    if (url === "null") {
      return default_img;
    }

    var last_segment = "";
    try {
      last_segment = url.split("/").pop() || "";
    } catch (error) {
      confirm("Error: " + error);
      return "";
    }
    if (last_segment === "undefined") {
      return "";
    }
    if (last_segment === "null") {
      return "";
    }
    if (last_segment === "") {
      return "";
    }
    if (last_segment === null) {
      return "";
    }
    if (last_segment === undefined) {
      return "";
    }
    return BASE_URL + "/storage/images/" + last_segment;
  }

  static file(url: any) {
    var default_img = BASE_URL + "/storage/images/default.png";
    if (url === null) {
      return default_img;
    }
    if (url === undefined) {
      return default_img;
    }
    if (url === "undefined") {
      return default_img;
    }
    if (url === "") {
      return default_img;
    }
    if (url === "null") {
      return default_img;
    }

    var last_segment = "";
    try {
      last_segment = url.split("/").pop() || "";
    } catch (error) {
      confirm("Error: " + error);
      return "";
    }
    if (last_segment === "undefined") {
      return "";
    }
    if (last_segment === "null") {
      return "";
    }
    if (last_segment === "") {
      return "";
    }
    if (last_segment === null) {
      return "";
    }
    if (last_segment === undefined) {
      return "";
    }
    return BASE_URL + "/storage/files/" + last_segment;
  }
}

export default Utils;
