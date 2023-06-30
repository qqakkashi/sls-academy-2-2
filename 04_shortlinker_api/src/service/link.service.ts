import { dbConnect } from "../../config/db.config";

class LinkService {
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

    const result = await collection.insertOne({
      full_link: link,
      shorted_link: shortedLink,
    });

    return shortedLink;
  }
}

export default new LinkService();
