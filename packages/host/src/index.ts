/**
 * @uibubbles/host — DRAFT types, spec 0.1-draft. No runtime implementation yet.
 * These mirror schema/uibubbles.manifest.schema.json and sketch the `uib` API
 * that extension code sees. Everything here may change.
 */

export type SpecVersion = "0.1-draft";

/** An https directory URL containing uibubbles.json, with trailing slash. */
export type ExtensionId = `https://${string}/`;

export type RenderMode = "declarative" | "worker" | "frame";

export type Permission =
  | "context.theme"
  | "context.locale"
  | "context.timezone"
  | "context.size"
  | "headless.calls"
  | "storage.local";

export interface MethodDeclaration {
  /** interactive: the user's gesture is the grant. headless: needs a grant in advance. */
  kind: "interactive" | "headless";
  description?: string;
  input?: Record<string, unknown>;
  output?: Record<string, unknown>;
}

export interface UsesEntry {
  id: ExtensionId;
  /** Semver range, for example "^1". */
  version: string;
}

export interface Manifest {
  $schema?: string;
  uibubbles: SpecVersion;
  id: ExtensionId;
  name: string;
  version: string;
  description?: string;
  entry?: { url: string; integrity?: string };
  modes: RenderMode[];
  provides?: Record<string, MethodDeclaration>;
  uses?: Record<string, UsesEntry>;
  emits?: string[];
  accepts?: string[];
  network?: { domains?: string[] };
  permissions?: Permission[];
}

/** What the host actually decided, per requested item. Requested is not granted. */
export type GrantState = "granted" | "ask" | "denied";
export type GrantReport = Record<string, GrantState>;

export interface HostContext {
  theme?: "light" | "dark";
  locale?: string;
  timezone?: string;
  size?: { width: number; height: number };
}

/** Raised when the user dismisses an interactive call. */
export interface Cancelled {
  cancelled: true;
}

export type InteractiveResult<T> = T | Cancelled;

export interface ContactsChooseOptions {
  min?: number;
  max?: number;
  fields?: Array<"name" | "email" | "phone">;
}

export type Unsubscribe = () => void;

/** A proxy for one of the extensions named in the caller's manifest `uses`. */
export interface ExtensionProxy {
  [method: string]: (input?: unknown) => Promise<unknown>;
}

/** The surface extension code sees as `uib`. Illustrative. */
export interface UibApi {
  readonly context: HostContext;
  /** `uib.ext("contacts").choose({ min: 1, max: 5 })` */
  ext(alias: string): ExtensionProxy;
  /** Equivalent, with a dotted method path: `uib.invoke("contacts.choose", …)`. */
  invoke<T = unknown>(path: string, input?: unknown): Promise<InteractiveResult<T>>;
  /** Emit an event declared in the manifest's `emits`. Crosses a wall only if glued. */
  emit(event: string, payload?: unknown): void;
  /** Listen for an event declared in the manifest's `accepts`. */
  on(event: string, handler: (payload: unknown) => void): Unsubscribe;
  /** Ask the host to close this Bubble. */
  pop(): void;
}

/** Lifecycle verbs a host may apply to a Bubble instance. */
export type LifecycleVerb = "pop" | "pin" | "expand" | "glue" | "unglue" | "spawn";
