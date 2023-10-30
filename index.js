const fs = require("fs");

let from
let to
let dir = process.argv[process.argv.length - 1]
for (let arg of process.argv) {
  if (arg.startsWith("--from=")) {
    from = arg.split("--from=")[1]
  }
  if (arg.startsWith("--to=")) {
    to = arg.split("--to=")[1]
  }
}

if (process.argv.length < 5) {
  console.error("Please provide a directory name as a command line argument.");
  process.exit(1);
}


function processFiles(from, to, dir) {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    if (file.split(".").length === 1) {
      // directory 
      processFiles(from, to, dir + "/" + file)
    }

    if (file.endsWith(from)) {
      // convert
      convert(from, to, dir + "/" + file)
    }


  }

}

function convert(from, to, path) {
  let fileName = path.split(".").slice(0, -1).join("")
  fs.renameSync(fileName + from, fileName + to);
}

processFiles(from, to, dir)


