#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from "zod/v4";
import { assessEvidence } from "./core/evidence.js";
import { prioritize } from "./core/prioritize.js";

const server = new McpServer({
  name: "ngl-ralph",
  version: "0.1.0"
});

server.registerTool(
  "ralph.server_info",
  {
    title: "Ralph server information",
    description: "Describe this NGL-RALPH server and its current safety boundary.",
    inputSchema: {}
  },
  async () => ({
    content: [{
      type: "text",
      text: JSON.stringify({
        name: "NGL-RALPH",
        version: "0.1.0",
        mode: "read-only foundation",
        capabilities: ["evidence assessment", "work prioritization"],
        execution: "No shell execution, repository writes, deployments, spending, or external publication."
      }, null, 2)
    }]
  })
);

server.registerTool(
  "ralph.assess_evidence",
  {
    title: "Assess evidence",
    description: "Separate verified evidence from assertions and identify limitations. A claim is verified only when it has a source and direct or corroborated strength.",
    inputSchema: {
      objective: z.string().min(1),
      claims: z.array(z.object({
        id: z.string().optional(),
        statement: z.string(),
        source: z.string().optional(),
        strength: z.enum(["direct", "corroborated", "inferred", "asserted"]).optional(),
        verified: z.boolean().optional()
      })).default([])
    }
  },
  async input => ({
    content: [{ type: "text", text: JSON.stringify(assessEvidence(input), null, 2) }]
  })
);

server.registerTool(
  "ralph.prioritize",
  {
    title: "Prioritize work",
    description: "Rank work items using explicit impact, urgency, risk reduction, and effort inputs. Scores are decision support, not objective truth.",
    inputSchema: {
      items: z.array(z.object({
        id: z.string().optional(),
        title: z.string(),
        impact: z.number().min(0).max(5).default(0),
        urgency: z.number().min(0).max(5).default(0),
        effort: z.number().positive().default(1),
        riskReduction: z.number().min(0).max(5).default(0)
      }))
    }
  },
  async input => ({
    content: [{ type: "text", text: JSON.stringify({
      scoring: "(impact × 2 + urgency + risk reduction × 1.5) ÷ effort",
      ranked: prioritize(input.items)
    }, null, 2) }]
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
