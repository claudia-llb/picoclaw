import type { OpenClawConfig } from "../../config/config.js";
import type {
  GroupToolPolicyBySenderConfig,
  GroupToolPolicyConfig,
} from "../../config/types.tools.js";
import {
  resolveChannelGroupRequireMention,
  resolveChannelGroupToolsPolicy,
  resolveToolsBySender,
} from "../../config/group-policy.js";

type GroupMentionParams = {
  cfg: OpenClawConfig;
  groupId?: string | null;
  groupChannel?: string | null;
  groupSpace?: string | null;
  accountId?: string | null;
  senderId?: string | null;
  senderName?: string | null;
  senderUsername?: string | null;
  senderE164?: string | null;
};

function parseTelegramGroupId(value?: string | null) {
  if (!value) {
    return { chatId: "", topicId: undefined as number | undefined };
  }
  let text = value.trim();
  const superPrefix = text.startsWith("-100");
  const topicSep = text.includes(":topic:");
  if (topicSep) {
    const [base, topicPart] = text.split(":topic:");
    const topicNum = Number.parseInt(topicPart ?? "", 10);
    return {
      chatId: base?.trim() ?? "",
      topicId: Number.isNaN(topicNum) ? undefined : topicNum,
    };
  }
  if (superPrefix) {
    text = text.slice(4);
  }
  return { chatId: text, topicId: undefined };
}

function resolveTelegramRequireMention(params: {
  cfg: OpenClawConfig;
  groupId?: string | null;
  groupChannel?: string | null;
  accountId?: string | null;
}): boolean {
  const parsed = parseTelegramGroupId(params.groupId);
  const topicChannelId =
    parsed.topicId != null ? `${parsed.chatId}:topic:${parsed.topicId}` : undefined;

  const channelMatch = topicChannelId
    ? resolveChannelGroupRequireMention({
        cfg: params.cfg,
        channel: "telegram",
        groupId: topicChannelId,
        accountId: params.accountId,
      })
    : undefined;
  if (channelMatch != null) {
    return channelMatch;
  }
  return resolveChannelGroupRequireMention({
    cfg: params.cfg,
    channel: "telegram",
    groupId: parsed.chatId || params.groupId,
    accountId: params.accountId,
  });
}

export function resolveTelegramGroupRequireMention(params: GroupMentionParams): boolean {
  return resolveTelegramRequireMention({
    cfg: params.cfg,
    groupId: params.groupId,
    groupChannel: params.groupChannel,
    accountId: params.accountId,
  });
}

export function resolveTelegramGroupToolPolicy(
  params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return resolveChannelGroupToolsPolicy({
    cfg: params.cfg,
    channel: "telegram",
    groupId: params.groupId,
    accountId: params.accountId,
    senderId: params.senderId,
    senderName: params.senderName,
    senderUsername: params.senderUsername,
  });
}

// Stub functions for removed channels
export function resolveWhatsAppGroupRequireMention(_params: GroupMentionParams): boolean {
  return true;
}

export function resolveIMessageGroupRequireMention(_params: GroupMentionParams): boolean {
  return true;
}

export function resolveDiscordGroupRequireMention(_params: GroupMentionParams): boolean {
  return true;
}

export function resolveGoogleChatGroupRequireMention(_params: GroupMentionParams): boolean {
  return true;
}

export function resolveSlackGroupRequireMention(_params: GroupMentionParams): boolean {
  return true;
}

export function resolveBlueBubblesGroupRequireMention(_params: GroupMentionParams): boolean {
  return true;
}

export function resolveGoogleChatGroupToolPolicy(
  _params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return undefined;
}

export function resolveWhatsAppGroupToolPolicy(
  _params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return undefined;
}

export function resolveIMessageGroupToolPolicy(
  _params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return undefined;
}

export function resolveDiscordGroupToolPolicy(
  _params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return undefined;
}

export function resolveSlackGroupToolPolicy(
  _params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return undefined;
}

export function resolveBlueBubblesGroupToolPolicy(
  _params: GroupMentionParams,
): GroupToolPolicyConfig | undefined {
  return undefined;
}
