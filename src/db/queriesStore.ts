import fs from "fs";
import path from "path";
import process from "node:process";

export interface ContactQuery {
  id: number;
  name: string;
  email: string;
  purpose: string;
  message: string;
  created_at: string;
}

// StorageProvider Abstraction Layer to prevent loss during restarts and handle filesystem issues cleanly
export interface StorageProvider {
  save(queryData: Omit<ContactQuery, "id" | "created_at">): ContactQuery;
  getAll(): ContactQuery[];
}

// Production file storage implementation
export class FileStorageProvider implements StorageProvider {
  private dbDir = path.join(process.cwd(), "data");
  private dbPath = path.join(this.dbDir, "contact_queries.json");

  constructor() {
    this.initStore();
  }

  private initStore() {
    try {
      if (!fs.existsSync(this.dbDir)) {
        fs.mkdirSync(this.dbDir, { recursive: true });
      }
      if (!fs.existsSync(this.dbPath)) {
        fs.writeFileSync(this.dbPath, JSON.stringify([], null, 2), "utf-8");
      }
    } catch (err) {
      console.error("[STORAGE] FileStorageProvider failed to initialize:", err);
    }
  }

  save(queryData: Omit<ContactQuery, "id" | "created_at">): ContactQuery {
    this.initStore();
    try {
      const data = fs.readFileSync(this.dbPath, "utf-8");
      const queries: ContactQuery[] = JSON.parse(data);

      const newQuery: ContactQuery = {
        id: queries.length > 0 ? Math.max(...queries.map((q) => q.id)) + 1 : 1,
        name: queryData.name,
        email: queryData.email,
        purpose: queryData.purpose,
        message: queryData.message,
        created_at: new Date().toISOString(),
      };

      queries.push(newQuery);
      fs.writeFileSync(this.dbPath, JSON.stringify(queries, null, 2), "utf-8");
      return newQuery;
    } catch (err) {
      console.error("[STORAGE] FileStorageProvider write failure:", err);
      throw new Error("Local persistence write failure", { cause: err });
    }
  }

  getAll(): ContactQuery[] {
    try {
      if (!fs.existsSync(this.dbPath)) {
        return [];
      }
      const data = fs.readFileSync(this.dbPath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      console.error("[STORAGE] FileStorageProvider read failure:", err);
      return [];
    }
  }
}

// In-memory contingency storage in case of filesystem locks, permission issues or sandboxed read-only limits
export class MemoryStorageProvider implements StorageProvider {
  private queries: ContactQuery[] = [];
  private nextId = 1;

  save(queryData: Omit<ContactQuery, "id" | "created_at">): ContactQuery {
    const newQuery: ContactQuery = {
      id: this.nextId++,
      name: queryData.name,
      email: queryData.email,
      purpose: queryData.purpose,
      message: queryData.message,
      created_at: new Date().toISOString(),
    };
    this.queries.push(newQuery);
    return newQuery;
  }

  getAll(): ContactQuery[] {
    return [...this.queries];
  }
}

// TODO: PRODUCTION REQUIREMENT
// File-based persistence ('data/contact_queries.json') does not survive container redeployments, restarts, or server scale-to-zero.
// For robust enterprise reliability, migrate these endpoints to:
//   1. Google Cloud SQL (PostgreSQL)
//   2. Google Cloud Spanner / Firestore
// Ensure corresponding secrets and database connection credentials are fully managed.

let activeProvider: StorageProvider;
try {
  activeProvider = new FileStorageProvider();
} catch (err) {
  console.warn("[STORAGE] File system storage is unavailable or read-only. Falling back to MemoryStorageProvider. Data will be transient.", err);
  activeProvider = new MemoryStorageProvider();
}

export function getStorageProvider(): StorageProvider {
  return activeProvider;
}

export function saveContactQuery(queryData: Omit<ContactQuery, "id" | "created_at">): ContactQuery {
  try {
    return activeProvider.save(queryData);
  } catch (err) {
    console.error("[STORAGE] Active storage provider save operation failed. Engaging Memory fallback strategy.", err);
    if (!(activeProvider instanceof MemoryStorageProvider)) {
      try {
        const memoryFallback = new MemoryStorageProvider();
        const saved = memoryFallback.save(queryData);
        activeProvider = memoryFallback; // Fallback becomes active to prevent subsequent crashes
        return saved;
      } catch (fallbackErr) {
        console.error("[STORAGE] Fatal: Memory fallback mechanism also failed.", fallbackErr);
      }
    }
    throw err;
  }
}

export function getContactQueries(): ContactQuery[] {
  try {
    return activeProvider.getAll();
  } catch (err) {
    console.error("[STORAGE] Reading contact queries failed:", err);
    return [];
  }
}
