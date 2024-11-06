const fs = require("node:fs");

const path = require("node:path");

module.exports = async (client) => {
  try {
    const dirPath = path.join("./src/commands/");
    
    async function readFiles(dir) {
      const filesOrFolders = await fs.promises.readdir(dir).then((f) => {
        return f.map((d) => {
          return path.join(dir, d)
        })
      });
      
      const files = filesOrFolders.filter((f) => f.endsWith(".js"));
      
      const folders = filesOrFolders.filter((f) => !f.endsWith(".js"));
      
      for (d of folders) {
        const items = await readFiles(d);
        
        files.push(...items);
      }
      
      return files;
    }
    
    async function commandRegister(command) {
      if (!Object.keys(command).length) return;
      
      await client.commands.set(command.data.name, command);
    }
    
    const allFilePaths = await readFiles(dirPath);
    
    for (filePath of allFilePaths) {
      const file = require(path.resolve(filePath));
      
      if (file instanceof Array) {
        for (cmd of file) {
          await commandRegister(cmd);
        }
      } else {
        await commandRegister(file);
      }
    }
  } catch(err) {
    console.log(err)
  }
}