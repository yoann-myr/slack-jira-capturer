import dotenv from "dotenv";
dotenv.config({ override: true });

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN!;
const CHANNEL_ID = "C060X6VKWSH";

async function fetchMsg(ts: string) {
  const url = `https://slack.com/api/conversations.history?${new URLSearchParams({
    channel: CHANNEL_ID,
    latest: ts,
    oldest: ts,
    inclusive: "true",
    limit: "1",
  })}`;
  const r = await fetch(url, {
    headers: { Authorization: `Bearer ${SLACK_BOT_TOKEN}` },
  });
  const j = (await r.json()) as { messages: unknown[] };
  return j.messages[0];
}

// Inline reproductions of the parsers (so we can test without running the full agent)
function parseYbug(msg: any) {
  const a = msg.attachments?.[0];
  if (!a || a.footer !== "Reported via Ybug") return null;
  const title = (a.title ?? "").replace(/^\[[^\]]+\]\s*/, "").trim();
  const summary = a.fields?.find((f: any) => f.title === "Summary")?.value ?? "";
  return { pre_title: title || "Ybug report", body: summary || a.title || "" };
}
function parseTemplate(msg: any) {
  const text = msg.text ?? "";
  if (!/submitted feedback/i.test(text)) return null;
  const get = (label: string) =>
    text.match(new RegExp(`${label}:\\s*(.+)`, "i"))?.[1]?.trim();
  const title = get("Title");
  if (!title) return null;
  const product = get("Product")?.replace(/&amp;/g, "&");
  const detailsMatch = text.match(/Details:\s*\n?([\s\S]*)$/i);
  const details = detailsMatch?.[1]?.trim() ?? "";
  return { pre_title: title, product_area: product, body: details || title };
}

const ybugMsg = await fetchMsg("1777882165.762889");
console.log("Ybug parser:", JSON.stringify(parseYbug(ybugMsg), null, 2));
console.log();
const templateMsg = await fetchMsg("1777019960.894159");
console.log("Template parser:", JSON.stringify(parseTemplate(templateMsg), null, 2));
