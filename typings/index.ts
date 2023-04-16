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
/**
 * TriggerType
 * Characterizes the type of content which can trigger the rule.
 * @returns integer
 */
export enum TriggerType {
  /**
   * KEYWORD
   * check if content contains words from a user defined list of keywords
   * @returns integer
   */
  KEYWORD = 1,
  /**
   * SPAM
   * check if content represents generic spam
   * @returns integer
   */
  SPAM = 3,
  /**
   * KEYWORD_PRESET
   * check if content contains words from internal pre-defined wordsets
   * @returns integer
   */
  KEYWORD_PRESET = 4,
  /**
   * MENTION_SPAM
   * check if content contains more unique mentions than allowed
   * @returns integer
   */
  MENTION_SPAM = 5,
}
export enum KeywordPresetType {
  /**
   * PROFANITY
   * words that may be considered forms of swearing or cursing
   * @returns integer
   */
  PROFANITY = 1,
  /**
   * SEXUAL_CONTENT
   * words that refer to sexually explicit behavior or activity
   * @returns integer
   */
  SEXUAL_CONTENT = 2,
  /**
   * SLURS
   * personal insults or words that may be considered hate speech
   * @returns integer
   */
  SLURS = 3,
}
export enum ActionType {
  /**
   * BLOCK_MESSAGE
   * 	blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked.
   * @returns integer
   */
  BLOCK_MESSAGE = 1,
  /**
   * SEND_ALERT_MESSAGE
   * logs user content to a specified channel
   * @returns integer
   */
  SEND_ALERT_MESSAGE = 2,
  /**
   * TIMEOUT
   * timeout user for a specified duration *
   * @returns integer
   */
  TIMEOUT = 3,
}
export interface TriggetMetaData {
  /**
   * keyword_filter
   * substrings which will be searched for in content (Maximum of 1000)
   * @returns array
   */
  keyword_filter: string[];
  /**
   * regex_patterns
   * regular expression patterns which will be matched against content (Maximum of 10)
   * @returns array
   */
  regex_patterns: string[];
  /**
   * presets
   * the internally pre-defined wordsets which will be searched for in content
   * @returns KeywordPresetType
   */
  presets: KeywordPresetType;
  /**
   * allow_list
   * substrings which should not trigger the rule (Maximum of 100 or 1000)
   * @returns array
   */
  allow_list: string;
  /**
   * mention_total_limit
   * total number of unique role and user mentions allowed per message (Maximum of 50)
   * @returns integer
   */
  mention_total_limit: number;
}
export interface ActionMetaData {
  /**
   * channel_id
   * channel to which user content should be logged
   * @returns snowflake
   */
  channel_id: Snowflake;
  /**
   * duration_seconds
   * timeout duration in seconds
   * @returns integer
   */
  duration_seconds: number;
  /**
   * custom_message
   * additional explanation that will be shown to members whenever their message is blocked
   * @returns string
   */
  custom_message?: string;
}
export interface AutoModerationActionObject {
  /**
   * type
   * the type of action
   * @returns ActionType
   */
  type: ActionType;
  /**
   * metadata
   * additional metadata needed during execution for this specific action type
   * @returns ActionMetaData
   */
  metadata?: ActionMetaData;
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
   * the rule name
   * @returns string
   */
  name: string;
  /**
   * creator_id
   * the user which first created this rule
   * @returns snowflake
   */
  creator_id: Snowflake;
  /**
   * event_type
   * the rule event type
   * @returns EventType
   */
  event_type: EventType;
  /**
   * trigger_type
   * the rule trigger type
   * @returns TriggerType
   */
  trigger_type: TriggerType;
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
  actions: AutoModerationActionObject[];
  /**
   * enabled
   * whether the rule is enabled
   * @returns boolean
   */
  enabled: boolean;
  /**
   * exempt_roles
   * the role ids that should not be affected by the rule (Maximum of 20)
   * @returns array
   */
  exempt_roles: Snowflake[];
  /**
   * exempt_channels
   * the channel ids that should not be affected by the rule (Maximum of 50)
   * @returns array
   */
  exempt_channels: Snowflake[];
}
