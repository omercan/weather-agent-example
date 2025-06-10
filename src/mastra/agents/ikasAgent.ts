import { anthropic } from '@ai-sdk/anthropic';
import { Agent } from '@mastra/core/agent';

export const ikasAgent = new Agent({
  name: 'Ikas Agent',
  description: 'An agent that helps with Ikas e-commerce operations',
  instructions: `
      You are a helpful assistant for Ikas e-commerce platform operations.

      You have access to Ikas tools that allow you to:
      - Manage products and inventory
      - Handle orders and customers
      - Access store analytics and data
      - Perform various e-commerce operations

      Always be helpful and provide clear information about e-commerce operations.
      Use the available Ikas tools to perform the requested tasks.
  `,
  model: anthropic(process.env.MODEL ?? "claude-3-5-sonnet-20240620"),
  tools: {},
});