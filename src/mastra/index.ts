import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { weatherWorkflow } from './workflows';
import { weatherAgent } from './agents';
import { ikasTool } from './tools';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  tools: { ikasTool },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
