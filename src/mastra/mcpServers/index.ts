import { MCPClient } from "@mastra/mcp";

export const mcp = new MCPClient({
  servers: {
    ikas: {
      command: "npx",
      args: [
        "mcp-remote",
        "https://api.myikas.dev/api/admin/mcp",
        "--header",
        "Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmZTZhOTEzLWE3YjYtNDQyMy1iODA3LTU0OTc1ZGM4NGI3NSIsImVtYWlsIjoib21lcmNhbkBpa2FzLmNvbSIsImZpcnN0TmFtZSI6IsOWbWVyY2FuIiwibGFzdE5hbWUiOiLDh2VsaWtsZXIiLCJtZXJjaGFudElkIjoiNjEyZDkyMmYtZWJkZi00YTQzLWJkNWEtM2M1ZDUzMjFlMjY2Iiwic3RvcmVOYW1lIjoicmFmYXNpbHZhIiwiaW1hZ2VJZCI6IjlhYzNhN2ZjLTI3MGEtNGIzNy05YjIxLTMzZGUxZmJlZDI2NCIsInR5cGUiOjEwMCwiZmVhdHVyZXMiOltdLCJsYW5ndWFnZSI6InRyIiwibGltaXRzIjp7IjIiOjEwLCIzIjoxLCI0IjoyLCI1IjoxNSwiNiI6MSwiNyI6MywiOCI6MywiOSI6MSwiMTEiOjIsIjEyIjoxLCIxMyI6MSwiMTUiOjIsIjE3IjoxLCIxOCI6MSwiMTkiOjIsIjIxIjoxLCIyMiI6MiwiMjMiOjIsIjI0IjoxLCIyNSI6MSwiMjYiOjEsIjI3IjoxLCIyOCI6MSwiMjkiOjEsIjMwIjoxLCIzMiI6MSwiMzMiOjEsIjM0IjoxLCIzNSI6MSwiMzYiOjIsIjM4IjoxLCIzOSI6MSwiNDEiOjEsIjQyIjoxLCI0MyI6MiwiNDQiOjMsIjQ1IjoyfSwibWZhIjowLCJpYXQiOjE3NDk1NTE4MDksImV4cCI6MTc0OTYzODIwOSwiYXVkIjoicmFmYXNpbHZhLm15aWthcy5kZXYiLCJpc3MiOiJyYWZhc2lsdmEubXlpa2FzLmRldiIsInN1YiI6Im9tZXJjYW5AaWthcy5jb20ifQ.2s4kgC1alpLJ1Txhm4DieCHf0OuSfcT91YHgYGrzgB0",
        "--debug"
      ]
    }
  }
});