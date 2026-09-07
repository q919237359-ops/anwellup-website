import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const project = fs.realpathSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));
const label = process.argv[2] || "checkpoint";
if (!/^[a-z0-9-]+$/.test(label)) throw new Error("Use a short lowercase checkpoint label.");
const parent = path.join(path.dirname(project), "anwellup-snapshots");
fs.mkdirSync(parent, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const destination = path.join(parent, `${stamp}-${label}`);
fs.mkdirSync(destination); // An existing checkpoint is never overwritten.
const sourceCopy = path.join(destination, "current-source");
fs.mkdirSync(sourceCopy);
const excludedDirectories = new Set([".git", "node_modules", ".next", "out", "dist", "output"]);
const excludedFiles = name => name.startsWith(".env") || /\.(log|local|tsbuildinfo)$/.test(name);
const files = [];
const hash = content => crypto.createHash("sha256").update(content).digest("hex");

function copyDirectory(directory, relative = "") {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error(`Review symbolic link before backing up: ${entry.name}`);
    const name = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      if (excludedDirectories.has(entry.name)) continue;
      fs.mkdirSync(path.join(sourceCopy, name), { recursive: true });
      copyDirectory(path.join(directory, entry.name), name);
    } else if (entry.isFile() && !excludedFiles(entry.name)) {
      const content = fs.readFileSync(path.join(directory, entry.name));
      const target = path.join(sourceCopy, name);
      fs.writeFileSync(target, content, { flag: "wx" });
      const checksum = hash(content);
      if (hash(fs.readFileSync(target)) !== checksum) throw new Error(`Copy verification failed: ${name}`);
      files.push({ path: name.replaceAll("\\", "/"), bytes: content.length, sha256: checksum });
    }
  }
}

copyDirectory(project);
const git = args => execFileSync("git", args, { cwd: project, encoding: "utf8", windowsHide: true }).trim();
const head = git(["rev-parse", "HEAD"]);
const originalArchive = path.join(destination, "original-head.zip");
git(["archive", "--format=zip", `--output=${originalArchive}`, head]);
const manifest = {
  createdAt: new Date().toISOString(), label, project, originalGitHead: head,
  gitStatus: git(["status", "--short"]),
  exclusions: [...excludedDirectories, ".env*", "*.log", "*.local", "*.tsbuildinfo"],
  sourceFileCount: files.length,
  sourceBytes: files.reduce((sum, file) => sum + file.bytes, 0),
  originalArchiveSha256: hash(fs.readFileSync(originalArchive)), files,
};
fs.writeFileSync(path.join(destination, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", { flag: "wx" });
fs.writeFileSync(path.join(destination, "RESTORE.md"), [
  "# ANWELLUP checkpoint", "",
  "current-source/ contains a verified copy of the source, configuration and public assets at this checkpoint.",
  "original-head.zip contains the last committed version before the current uncommitted migration.",
  "manifest.json records SHA-256 checksums, the original Git commit and working-tree status.", "",
  "To inspect a previous version, copy current-source/ or extract original-head.zip into a NEW directory.",
  "Install dependencies and build there. Do not overwrite the active project without reviewing changes made since this checkpoint.",
  "Git history, dependency/build caches and local environment files are not included in current-source/.", "",
].join("\n"), { flag: "wx" });
console.log(JSON.stringify({ destination, head, files: files.length, bytes: manifest.sourceBytes, verified: true }, null, 2));
