import {
  AutoModerationActionObject,
  AutoModerationRuleObject,
  EventType,
  Snowflake,
  TriggerType,
  TriggerMetaData,
  IError,
} from "../typings";
import { ApplicationType, Request } from "./Request";

export interface IcreateAutoModRule {
  name: string;
  event_type: number;
  trigger_type: TriggerType;
  trigger_metadata?: TriggerMetaData;
  actions: AutoModerationActionObject[] | [];
  enabled?: boolean;
  exempt_roles?: Snowflake[] | [];
  exempt_channels?: Snowflake[] | [];
}

export interface IeditAutoModRule {
  id: Snowflake;
  name: string;
  event_type: number;
  trigger_type: TriggerType;
  trigger_metadata?: TriggerMetaData;
  actions: AutoModerationActionObject[] | [];
  enabled?: boolean;
  exempt_roles?: Snowflake[] | [];
  exempt_channels?: Snowflake[] | [];
}
export class AutoModeration implements Readonly<AutoModerationRuleObject> {
  protected reqeust: Request;
  /**
   * id
   * the id of this rule
   * @returns snowflake
   */
  public readonly id: Snowflake = "";
  /**
   * guilded_id
   * the id of the guild which this rule belongs to
   * @returns snowflake
   */
  public guilded_id: Snowflake = "";
  /**
   * name
   * the rule name
   * @returns string
   */
  public name: string = "";
  /**
   * creator_id
   * the user which first created this rule
   * @returns snowflake
   */
  public creator_id: Snowflake = "";
  /**
   * event_type
   * the rule event type
   * @returns EventType
   */
  public event_type: EventType = 1;
  /**
   * trigger_type
   * the rule trigger type
   * @returns TriggerType
   */
  public trigger_type: TriggerType = 1;
  /**
   * trigger_metadata
   * the rule trigger metadata
   * @returns integer
   */
  public trigger_metadata: TriggerMetaData;
  /**
   * actions
   * the actions which will execute when the rule is triggered
   * @returns array
   */
  public actions: AutoModerationActionObject[] = [];
  /**
   * enabled
   * whether the rule is enabled
   * @returns boolean
   */
  public enabled: boolean = false;
  /**
   * exempt_roles
   * the role ids that should not be affected by the rule (Maximum of 20)
   * @returns array
   */
  public exempt_roles: Snowflake[] = [];
  /**
   * exempt_channels
   * the channel ids that should not be affected by the rule (Maximum of 50)
   * @returns array
   */
  public exempt_channels: Snowflake[] = [];
  constructor(token: string, data?: AutoModerationRuleObject) {
    this.reqeust = new Request(token);
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

  public async getRules<T>(
    guildID: Snowflake
  ): Promise<T | AutoModerationRuleObject | IError | unknown> {
    return await this.reqeust.req(
      {
        method: "GET",
        endpoint: `/guilds/${guildID}/auto-moderation/rules`,
      },
      ApplicationType.JSON
    );
  }

  public async getAutoModRule<T>(
    guildID: Snowflake,
    opts: { id: string }
  ): Promise<T | AutoModerationRuleObject | IError | unknown> {
    return await this.reqeust.req<AutoModerationRuleObject>(
      {
        method: "GET",
        endpoint: `/guilds/${guildID}/auto-moderation/rules/${opts.id}`,
      },
      ApplicationType.JSON
    );
  }

  public async createAutoModRule<T>(
    guildID: Snowflake,
    opts: IcreateAutoModRule
  ): Promise<T | AutoModerationRuleObject | IError | unknown> {
    if (opts.exempt_roles || opts.exempt_channels) {
      if (opts.exempt_roles.length > 20) {
        throw new ReferenceError(
          `@antibot/salt#${arguments.callee.name} 'exempt_roles' array can't overcome 20`
        );
      } else if (opts.exempt_channels.length > 50) {
        throw new ReferenceError(
          `@antibot/salt#${arguments.callee.name} 'exempt_channels' array can't overcome 50`
        );
      } else {
        return await this.reqeust.req<AutoModerationRuleObject>(
          {
            method: "POST",
            endpoint: `/guilds/${guildID}/auto-moderation/rules`,
            data: {
              name: opts.name || this.name,
              event_type: opts.event_type || this.event_type,
              trigger_type: opts.trigger_type || this.trigger_type,
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
    } else {
      return await this.reqeust.req<AutoModerationRuleObject>(
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

  public async editAutoModRule<T>(
    guildID: Snowflake,
    opts: IeditAutoModRule
  ): Promise<T | AutoModerationRuleObject | IError | unknown> {
    if (opts.exempt_roles || opts.exempt_channels) {
      if (opts.exempt_roles.length > 20) {
        throw new ReferenceError(
          `@antibot/salt#${arguments.callee.name} 'exempt_roles' array can't overcome 20`
        );
      } else if (opts.exempt_channels.length > 50) {
        throw new ReferenceError(
          `@antibot/salt#${arguments.callee.name} 'exempt_channels' array can't overcome 50`
        );
      } else {
        return await this.reqeust.req<AutoModerationRuleObject>(
          {
            method: "PATCH",
            endpoint: `/guilds/${guildID}/auto-moderation/rules/${opts.id}`,
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

  public async deleteAutoModRule<T>(
    guildID: Snowflake,
    opts: { id: string }
  ): Promise<T | IError | unknown> {
    return await this.reqeust.req<AutoModerationRuleObject>(
      {
        method: "DELETE",
        endpoint: `/guilds/${guildID}/auto-moderation/rules/${opts.id}`,
      },
      ApplicationType.JSON
    );
  }
}
