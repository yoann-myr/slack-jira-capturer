// One-time setup: create the environment and agent, print their IDs.
// Run once, save the IDs into .env, then run.ts forever after.
import dotenv from "dotenv";
dotenv.config({ override: true });
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as yaml from "js-yaml";

const client = new Anthropic();

async function main() {
  const agentSpec = yaml.load(fs.readFileSync("agent.yaml", "utf-8")) as Record<
    string,
    unknown
  >;
  const envSpec = yaml.load(fs.readFileSync("environment.yaml", "utf-8")) as Record<
    string,
    unknown
  >;

  const env = await client.beta.environments.create(envSpec as never);
  console.log(`ENV_ID=${env.id}`);

  const agent = await client.beta.agents.create(agentSpec as never);
  console.log(`AGENT_ID=${agent.id}`);
  console.log(`AGENT_VERSION=${(agent as { version: number }).version}`);

  console.log("\nAdd these to .env:");
  console.log(`AGENT_ID=${agent.id}`);
  console.log(`ENV_ID=${env.id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
