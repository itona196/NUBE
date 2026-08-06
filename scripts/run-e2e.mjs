import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const playwrightCli = fileURLToPath(
  new URL("../node_modules/@playwright/test/cli.js", import.meta.url),
);
const siteUrl = "http://127.0.0.1:3100";
const testEnvironment = { ...process.env, NEXT_DIST_DIR: ".next-test" };
const generatedConfigFiles = ["next-env.d.ts", "tsconfig.json"];
const originalConfigs = new Map(
  await Promise.all(
    generatedConfigFiles.map(async (file) => [
      file,
      await readFile(new URL(`../${file}`, import.meta.url), "utf8"),
    ]),
  ),
);

let server;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, options);
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}

async function waitForServer(timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (server?.exitCode !== null) {
      throw new Error(`Le serveur Next s’est arrêté avec le code ${server.exitCode}.`);
    }

    try {
      const response = await fetch(siteUrl);
      if (response.ok) return;
    } catch {
      // Le serveur est encore en cours de démarrage.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error("Le serveur Next n’a pas démarré dans le délai prévu.");
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;

  server.kill();
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);

  if (server.exitCode === null) server.kill("SIGKILL");
}

let exitCode = 1;

try {
  const buildCode = await run(process.execPath, [nextCli, "build"], {
    cwd: projectRoot,
    env: testEnvironment,
    stdio: "inherit",
  });

  if (buildCode !== 0) throw new Error(`Le build de test a échoué avec le code ${buildCode}.`);

  server = spawn(
    process.execPath,
    [nextCli, "start", "--hostname", "127.0.0.1", "--port", "3100"],
    { cwd: projectRoot, env: testEnvironment, stdio: "inherit" },
  );

  await waitForServer();

  exitCode = await new Promise((resolve, reject) => {
    const tests = spawn(process.execPath, [playwrightCli, "test"], {
      cwd: projectRoot,
      stdio: "inherit",
    });

    tests.once("error", reject);
    tests.once("exit", (code) => resolve(code ?? 1));
  });
} catch (error) {
  console.error(error);
} finally {
  await stopServer();
  await Promise.all(
    [...originalConfigs].map(([file, content]) =>
      writeFile(new URL(`../${file}`, import.meta.url), content, "utf8"),
    ),
  );
}

process.exitCode = exitCode;
