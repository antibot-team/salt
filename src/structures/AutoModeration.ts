import {
  AutoModerationActionObject,
  AutoModerationRuleObject,
  EventType,
  Snowflake,
  TriggerType,
  TriggetMetaData,
} from "../../typings";
import { ApplicationType, Request } from "./Request";

export interface IcreateAutomodRule {
  name: string;
  event_type: number;
  trigger_metadata?: TriggetMetaData;
  actions: AutoModerationActionObject[] | [];
  enabled?: boolean;
  exempt_roles?: Snowflake[] | [];
  exempt_channels?: Snowflake[] | [];
}
export class AutoModeration implements Readonly<AutoModerationRuleObject> {
  private reqeust: Request;
  /**
   * id
   * the id of this rule
   * @returns snowflake
   */
  id: Snowflake = "";
  /**
   * guilded_id
   * the id of the guild which this rule belongs to
   * @returns snowflake
   */
  guilded_id: Snowflake = "";
  /**
   * name
   * the rule name
   * @returns string
   */
  name: string = "";
  /**
   * creator_id
   * the user which first created this rule
   * @returns snowflake
   */
  creator_id: Snowflake = "";
  /**
   * event_type
   * the rule event type
   * @returns EventType
   */
  event_type: EventType = 1;
  /**
   * trigger_type
   * the rule trigger type
   * @returns TriggerType
   */
  trigger_type: TriggerType = 1;
  /**
   * trigger_metadata
   * the rule trigger metadata
   * @returns integer
   */
  trigger_metadata: TriggetMetaData;
  /**
   * actions
   * the actions which will execute when the rule is triggered
   * @returns array
   */
  actions: AutoModerationActionObject[] = [];
  /**
   * enabled
   * whether the rule is enabled
   * @returns boolean
   */
  enabled: boolean = false;
  /**
   * exempt_roles
   * the role ids that should not be affected by the rule (Maximum of 20)
   * @returns array
   */
  exempt_roles: Snowflake[] = [];
  /**
   * exempt_channels
   * the channel ids that should not be affected by the rule (Maximum of 50)
   * @returns array
   */
  exempt_channels: Snowflake[] = [];
  constructor(data: AutoModerationRuleObject, request: Request) {
    this.reqeust = request;
    this.id = data.id;
    this.guilded_id = data.guilded_id;
    this.name = data.name;
    this.creator_id = data.creator_id;
    this.event_type = data.event_type;
    this.trigger_type = data.trigger_type;
    this.trigger_metadata = data.trigger_metadata;
    this.actions = data.actions;
    this.enabled = data.enabled;
    this.exempt_roles = data.exempt_roles;
    this.exempt_channels = data.exempt_channels;
  }

  public async getRules(guildID: Snowflake) {
    return await this.reqeust.req(
      {
        method: "GET",
        endpoint: `/guilds/${guildID}/auto-moderation/rules`,
      },
      ApplicationType.JSON
    );
  }

  public async getAutoModRule(
    guildID: Snowflake
  ): Promise<AutoModerationRuleObject | unknown> {
    return await this.reqeust.req(
      {
        method: "GET",
        endpoint: `/guilds/${guildID}/auto-moderation/rules/${this.id}`,
      },
      ApplicationType.JSON
    );
  }

  public async createAutoModRule(guildID: Snowflake, opts: IcreateAutomodRule) {
    if (opts.exempt_roles.length < 20) {
      throw new ReferenceError(
        "@antibot/salt#createAutoModRule 'exempt_roles' array can't overcome 20"
      );
    } else if (opts.exempt_channels.length < 50) {
      throw new ReferenceError(
        "@antibot/salt#createAutoModRule 'exempt_channels' array can't overcome 50"
      );
    } else {
      return await this.reqeust.req(
        {
          method: "POST",
          endpoint: `/guilds/${guildID}/auto-moderation/rules`,
          data: {
            name: opts.name || this.name,
            event_type: opts.event_type || this.event_type,
            trigger_metadata: opts.trigger_metadata || this.trigger_metadata,
            actions: opts.actions || this.actions,
            enabled: opts.enabled || this.enabled,
            exempt_roles: opts.exempt_roles || this.exempt_roles,
            exempt_channels: opts.exempt_channels || this.exempt_channels,
          },
        },
        ApplicationType.JSON
      );
    }
  }
}
