import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';
import { ikasServer } from './mcpServers';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  mcpServers: { ikasServer },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
