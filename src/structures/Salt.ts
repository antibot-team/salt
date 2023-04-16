import { AutoModeration } from "./AutoModeration";
import { Request } from "./Request";

export class Salt {
  public automod: AutoModeration;
  constructor(token: string) {
    if (token == "") {
      throw new ReferenceError(
        "@antibot/salt/Salt#constructor Bot token is required"
      );
    }
    this.automod = new AutoModeration(token, Request as any);
  }
}
