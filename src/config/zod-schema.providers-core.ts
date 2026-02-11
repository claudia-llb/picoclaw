import { z } from "zod";
import {
  normalizeTelegramCommandDescription,
  normalizeTelegramCommandName,
  resolveTelegramCustomCommands,
} from "./telegram-custom-commands.js";
import { ToolPolicySchema } from "./zod-schema.agent-runtime.js";
import { ChannelHeartbeatVisibilitySchema } from "./zod-schema.channels.js";
import {
  BlockStreamingChunkSchema,
  BlockStreamingCoalesceSchema,
  DmConfigSchema,
  DmPolicySchema,
  GroupPolicySchema,
  MarkdownConfigSchema,
  ProviderCommandsSchema,
  ReplyToModeSchema,
  RetryConfigSchema,
  requireOpenAllowFrom,
} from "./zod-schema.core.js";

const ToolPolicyBySenderSchema = z.record(z.string(), ToolPolicySchema).optional();

const TelegramInlineButtonsScopeSchema = z.enum(["off", "dm", "group", "all", "allowlist"]);

const TelegramCapabilitiesSchema = z.union([
  z.array(z.string()),
  z
    .object({
      inlineButtons: TelegramInlineButtonsScopeSchema.optional(),
    })
    .strict(),
]);

export const TelegramTopicSchema = z
  .object({
    requireMention: z.boolean().optional(),
    groupPolicy: GroupPolicySchema.optional(),
    skills: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
    allowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    systemPrompt: z.string().optional(),
  })
  .strict();

export const TelegramGroupSchema = z
  .object({
    requireMention: z.boolean().optional(),
    groupPolicy: GroupPolicySchema.optional(),
    tools: ToolPolicySchema,
    toolsBySender: ToolPolicyBySenderSchema,
    skills: z.array(z.string()).optional(),
    enabled: z.boolean().optional(),
    allowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    systemPrompt: z.string().optional(),
    topics: z.record(z.string(), TelegramTopicSchema.optional()).optional(),
  })
  .strict();

const TelegramCustomCommandSchema = z
  .object({
    command: z.string().transform(normalizeTelegramCommandName),
    description: z.string().transform(normalizeTelegramCommandDescription),
  })
  .strict();

const validateTelegramCustomCommands = (
  value: { customCommands?: Array<{ command?: string; description?: string }> },
  ctx: z.RefinementCtx,
) => {
  if (!value.customCommands || value.customCommands.length === 0) {
    return;
  }
  const { issues } = resolveTelegramCustomCommands({
    commands: value.customCommands,
    checkReserved: false,
    checkDuplicates: false,
  });
  for (const issue of issues) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["customCommands", issue.index, issue.field],
      message: issue.message,
    });
  }
};

export const TelegramAccountSchemaBase = z
  .object({
    name: z.string().optional(),
    capabilities: TelegramCapabilitiesSchema.optional(),
    markdown: MarkdownConfigSchema,
    enabled: z.boolean().optional(),
    commands: ProviderCommandsSchema,
    customCommands: z.array(TelegramCustomCommandSchema).optional(),
    configWrites: z.boolean().optional(),
    dmPolicy: DmPolicySchema.optional().default("pairing"),
    botToken: z.string().optional(),
    tokenFile: z.string().optional(),
    replyToMode: ReplyToModeSchema.optional(),
    groups: z.record(z.string(), TelegramGroupSchema.optional()).optional(),
    allowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    groupAllowFrom: z.array(z.union([z.string(), z.number()])).optional(),
    groupPolicy: GroupPolicySchema.optional().default("allowlist"),
    historyLimit: z.number().int().min(0).optional(),
    dmHistoryLimit: z.number().int().min(0).optional(),
    dms: z.record(z.string(), DmConfigSchema.optional()).optional(),
    textChunkLimit: z.number().int().positive().optional(),
    chunkMode: z.enum(["length", "newline"]).optional(),
    blockStreaming: z.boolean().optional(),
    draftChunk: BlockStreamingChunkSchema.optional(),
    blockStreamingCoalesce: BlockStreamingCoalesceSchema.optional(),
    streamMode: z.enum(["off", "partial", "block"]).optional().default("partial"),
    mediaMaxMb: z.number().positive().optional(),
    timeoutSeconds: z.number().int().positive().optional(),
    retry: RetryConfigSchema,
    network: z
      .object({
        autoSelectFamily: z.boolean().optional(),
      })
      .strict()
      .optional(),
    proxy: z.string().optional(),
    webhookUrl: z.string().optional(),
    webhookSecret: z.string().optional(),
    webhookPath: z.string().optional(),
    actions: z
      .object({
        reactions: z.boolean().optional(),
        sendMessage: z.boolean().optional(),
        deleteMessage: z.boolean().optional(),
        sticker: z.boolean().optional(),
      })
      .strict()
      .optional(),
    reactionNotifications: z.enum(["off", "own", "all"]).optional(),
    reactionLevel: z.enum(["off", "ack", "minimal", "extensive"]).optional(),
    heartbeat: ChannelHeartbeatVisibilitySchema,
    linkPreview: z.boolean().optional(),
    responsePrefix: z.string().optional(),
  })
  .strict();

export const TelegramAccountSchema = TelegramAccountSchemaBase.superRefine((value, ctx) => {
  requireOpenAllowFrom({
    policy: value.dmPolicy,
    allowFrom: value.allowFrom,
    ctx,
    path: ["allowFrom"],
    message:
      'channels.telegram.dmPolicy="open" requires channels.telegram.allowFrom to include "*"',
  });
  validateTelegramCustomCommands(value, ctx);
});

export const TelegramConfigSchema = TelegramAccountSchemaBase.extend({
  accounts: z.record(z.string(), TelegramAccountSchema.optional()).optional(),
}).superRefine((value, ctx) => {
  requireOpenAllowFrom({
    policy: value.dmPolicy,
    allowFrom: value.allowFrom,
    ctx,
    path: ["allowFrom"],
    message:
      'channels.telegram.dmPolicy="open" requires channels.telegram.allowFrom to include "*"',
  });
  validateTelegramCustomCommands(value, ctx);

  const baseWebhookUrl = typeof value.webhookUrl === "string" ? value.webhookUrl.trim() : "";
  const baseWebhookSecret =
    typeof value.webhookSecret === "string" ? value.webhookSecret.trim() : "";
  if (baseWebhookUrl && !baseWebhookSecret) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "channels.telegram.webhookUrl requires channels.telegram.webhookSecret",
      path: ["webhookSecret"],
    });
  }
  if (!value.accounts) {
    return;
  }
  for (const [accountId, account] of Object.entries(value.accounts)) {
    if (!account) {
      continue;
    }
    if (account.enabled === false) {
      continue;
    }
    const accountWebhookUrl =
      typeof account.webhookUrl === "string" ? account.webhookUrl.trim() : "";
    if (!accountWebhookUrl) {
      continue;
    }
    const accountSecret =
      typeof account.webhookSecret === "string" ? account.webhookSecret.trim() : "";
    if (!accountSecret && !baseWebhookSecret) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "channels.telegram.accounts.*.webhookUrl requires channels.telegram.webhookSecret or channels.telegram.accounts.*.webhookSecret",
        path: ["accounts", accountId, "webhookSecret"],
      });
    }
  }
});
