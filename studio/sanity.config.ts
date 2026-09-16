import { EarthGlobeIcon, RocketIcon } from "@sanity/icons";
import { visionTool } from "@sanity/vision";
import {
  createAuthStore,
  defineConfig,
  type SchemaTypeDefinition,
} from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// URL for preview functionality, defaults to localhost:3000 if not set
const SANITY_STUDIO_PREVIEW_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

const sharedWorkspaceConfig = {
  projectId: "l3891ift",
  plugins: [
    presentationTool({
      previewUrl: {
        origin: SANITY_STUDIO_PREVIEW_URL,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
  auth: {
    redirectOnSingle: true,
    providers: [
      {
        name: "saml",
        title: "Equinor SSO",
        url: "https://api.sanity.io/v2021-10-01/auth/saml/login/55ba173c",
        logo: "/static/favicon.ico",
      },
    ],
  },
};

export default defineConfig([
  {
    ...sharedWorkspaceConfig,
    dataset: "production",
    name: "production-workspace",
    basePath: "/production",
    title: "Production Workspace",
    subtitle: "production",
    icon: EarthGlobeIcon,
    auth: createAuthStore({
      ...sharedWorkspaceConfig.auth,
      projectId: sharedWorkspaceConfig.projectId,
      dataset: "production",
      providers: (prev) => [...prev, ...sharedWorkspaceConfig.auth.providers],
    }),
  },
  {
    ...sharedWorkspaceConfig,
    dataset: "development",
    name: "development-workspace",
    basePath: "/development",
    title: "Development Workspace",
    subtitle: "development",
    icon: RocketIcon,
    auth: createAuthStore({
      ...sharedWorkspaceConfig.auth,
      projectId: sharedWorkspaceConfig.projectId,
      dataset: "development",
      providers: (prev) => [...prev, ...sharedWorkspaceConfig.auth.providers],
    }),
  },
]);
