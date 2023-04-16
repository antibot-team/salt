/**
 * https://discord.com/developers/docs/resources/auto-moderation
 */
/**
 * SnowFlake
 * Returns an id
 * @returns string
 */
export type Snowflake = string;
/**
 * EventType
 * Indicates in what event context a rule should be checked.
 * @returns type
 */
export enum EventType {
  /**
   * MESSAGE_SEND
   * when a member sends or edits a message in the guild
   * @returns integer
   */
  MESSAGE_SEND = 1,
}
export interface AutoModerationRuleObject {
  /**
   * id
   * the id of this rule
   * @returns snowflake
   */
  id: Snowflake;
  /**
   * guilded_id
   * the id of the guild which this rule belongs to
   * @returns snowflake
   */
  guilded_id: Snowflake;
  /**
   * name
   * 	the rule name
   * @returns string
   */
  name: string;
  /**
   * creator_id
   * the user which first created this rule
   * @returns snowflake
   */
  creator_id: Snowflake;
  event_type: EventType;
}
