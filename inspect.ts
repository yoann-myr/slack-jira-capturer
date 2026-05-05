import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const sid = process.argv[2];

const events = await client.beta.sessions.events.list(sid);
for (const e of events.data) {
  if (e.type === "agent.custom_tool_use") {
    console.log(e.name, JSON.stringify(e.input));
  }
}
