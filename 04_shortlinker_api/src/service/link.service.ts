import { dbConnect } from "../../config/db.config";
import ApiError from "../exeptions/api.errors";

class LinkService {
  checkLink(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error: any) {
      return false;
    }
  }
  async generateLink(): Promise<any> {
    const db = await dbConnect();
    const collection = db!.collection("links");

    const shortLink = Math.random().toString(36).slice(2, 8);
    const record = await collection.findOne({ shorted_link: shortLink });

    if (record !== null) {
      return this.generateLink();
    } else {
      return shortLink;
    }
  }
  async shortLink(link: string): Promise<string> {
    const db = await dbConnect();
    const collection = db!.collection("links");

    const shortedLink = await this.generateLink();

    const findLink = await collection.findOne({ full_link: link });
    if (findLink) {
      return findLink.shorted_link;
    }

    const isLinkReal = this.checkLink(link);

    if (isLinkReal) {
      const result = await collection.insertOne({
        full_link: link,
        shorted_link: shortedLink,
      });
    } else {
      throw ApiError.BadRequest("Provided link isn`t real");
    }

    return shortedLink;
  }

  async getRedirectLink(shortLink: string): Promise<string> {
    const db = await dbConnect();
    const collection = db!.collection("links");
    const findLink = await collection.findOne({ shorted_link: shortLink });
    if (findLink !== null) {
      return findLink.full_link;
    } else {
      throw ApiError.LinkNotFound("You need to generate this short link first");
    }
  }
}

export default new LinkService();
