// Test the get_idea_candidates Slack logic directly
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN!;

async function slackApi<T>(method: string, params: Record<string, string>): Promise<T> {
  const url = `https://slack.com/api/${method}?${new URLSearchParams(params)}`;
  const resp = await fetch(url, { headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` } });
  const json = (await resp.json()) as T & { ok: boolean; error?: string };
  if (!json.ok) throw new Error(`Slack ${method}: ${json.error}`);
  return json;
}

const hours = 48;
const oldest = (Date.now() / 1000 - hours * 3600).toFixed(0);
console.log(`now=${Math.floor(Date.now() / 1000)}  oldest=${oldest}`);

const ch = await slackApi<{ channels: { id: string; name: string }[] }>("conversations.list", {
  types: "public_channel,private_channel",
  limit: "1000",
});
const c = ch.channels.find((c) => c.name === "product-management")!;
console.log(`channel=${c.id}`);

const hist = await slackApi<{ messages: { text: string; ts: string; user?: string; reactions?: { name: string; count: number }[] }[] }>(
  "conversations.history",
  { channel: c.id, oldest, limit: "200" }
);

console.log(`messages returned: ${hist.messages.length}`);
for (const m of hist.messages) {
  const hasBulb = m.reactions?.some((r) => r.name === "bulb" || r.name === "light_bulb");
  console.log(`  ts=${m.ts}  user=${m.user ?? "(none)"}  hasBulb=${hasBulb}  reactions=${JSON.stringify(m.reactions ?? [])}  text="${(m.text ?? "").slice(0, 60)}"`);
}
