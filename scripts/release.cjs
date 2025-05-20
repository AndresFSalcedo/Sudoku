const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const archiver = require('archiver');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const run = (cmd) => {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
};

const zipFolder = (srcFolder, outPath) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`🗜 Created zip: ${outPath} (${archive.pointer()} bytes)`);
      resolve();
    });

    archive.on('error', reject);
    archive.pipe(output);
    archive.directory(srcFolder, false);
    archive.finalize();
  });
};

rl.question('Which release is this? (patch / minor / major): ', async (type) => {
  if (!['patch', 'minor', 'major'].includes(type)) {
    console.error('❌ Invalid release type. Use patch, minor, or major.');
    rl.close();
    process.exit(1);
  }

  try {
    // Step 1: Bump version
    run(`npm version ${type}`);

    // Step 2: Get new version
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    const version = pkg.version;

    // Step 3: Build
    run(`npm run build`);

    // Step 4: Copy dist/ to builds/vX.X.X
    const distDir = path.resolve(__dirname, '../dist');
    const buildDir = path.resolve(__dirname, `../builds/v${version}`);
    const zipPath = path.resolve(buildDir, `v${version}.zip`);

    fs.mkdirSync(buildDir, { recursive: true });
    fs.cpSync(distDir, buildDir, { recursive: true });
    console.log(`📦 Copied build to builds/v${version}`);

    // Step 5: Create zip inside the build directory
    await zipFolder(buildDir, zipPath);

    // Step 6: Push changes and tags
    run(`git push`);
    run(`git push --tags`);
    console.log(`\n✅ Release v${version} complete and pushed!`);

  } catch (err) {
    console.error('\n❌ Release failed:', err.message);
  } finally {
    rl.close();
  }
});
