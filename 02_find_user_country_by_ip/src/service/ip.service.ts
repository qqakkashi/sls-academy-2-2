import * as fs from "fs";

class IpService {
  parseIp(ipAddress: string | string[] | undefined) {
    let ipNumber = 0;
    let userIp = "";
    if (typeof ipAddress !== "object") {
      const idOctets = ipAddress!.split(",")[0].split(".");
      userIp = ipAddress!.split(",")[0];
      for (let i = 0; i < idOctets.length; i++) {
        ipNumber += parseInt(idOctets[i]) * Math.pow(256, 3 - i);
      }
    } else {
      const idOctets = ipAddress[0].split(".");
      userIp = ipAddress[0];
      for (let i = 0; i < idOctets.length; i++) {
        ipNumber += parseInt(idOctets[i]) * Math.pow(256, 3 - i);
      }
    }
    return { ipNumber, userIp };
  }
  readCsv(path: string) {
    const csvDataRead = fs.readFileSync(path, "utf8").split("\n");
    const csvData = csvDataRead
      .map((row: string) => {
        const cells = row.split(",");

        if (cells[1] !== undefined) {
          return {
            start: +cells[0].slice(1).slice(0, -1),
            end: +cells[1].slice(1).slice(0, -1),
            country_letters: cells[2].slice(1).slice(0, -1),
            country: cells[3].slice(1).slice(0, -2),
          };
        } else {
          return null;
        }
      })
      .filter((item) => {
        return item !== null;
      });

    return csvData;
  }
  async detectIp(ipAddress: string | string[] | undefined) {
    const userIpData = this.parseIp(ipAddress);
    const csvPath = "./files/ip_data.csv";
    const csvData = this.readCsv(csvPath);
    const userCountry = csvData.filter((data: any) => {
      if (
        userIpData.ipNumber <= data.end &&
        userIpData.ipNumber >= data.start
      ) {
        return data;
      }
    });
    if (userCountry.length === 0) {
      return { userIp: userIpData.userIp, userCountry: "No coutnry(Moon?)" };
    }
    return { userIp: userIpData.userIp, userCountry: userCountry[0]?.country };
  }
}

export default new IpService();
