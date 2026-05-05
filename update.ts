import dotenv from "dotenv";
dotenv.config({ override: true });
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as yaml from "js-yaml";

const client = new Anthropic();

async function main() {
  const spec = yaml.load(fs.readFileSync("agent.yaml", "utf-8")) as Record<string, unknown>;
  const agentId = process.env.AGENT_ID!;
  const current = await client.beta.agents.retrieve(agentId);
  const currentVersion = (current as { version: number }).version;
  console.log(`Updating ${agentId} (current v${currentVersion})...`);
  const updated = await client.beta.agents.update(agentId, {
    ...spec,
    version: currentVersion,
  } as never);
  console.log(`New version: ${(updated as { version: number }).version}`);
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
