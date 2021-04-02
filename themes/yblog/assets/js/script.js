addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "`") {
    setSticky("true");
    setCommandOpen("true");
  }

  if (
    event.key.toLowerCase() === "escape" ||
    event.key.toLowerCase() === "esc"
  ) {
    setCommandOpen("false");
  }
});

addEventListener("load", () => {
  const dark = localStorage.getItem("dark");
  if (dark == null) {
    localStorage.setItem("dark", "false");
  } else {
    setDark(dark);
  }

  document.body.style.visibility = "visible";
  document.body.style.opacity = 1;

  document.getElementById("title").addEventListener("click", () => {
    toggleCommand();
  });

  document.getElementById("command").addEventListener("change", (event) => {
    const command = document.getElementById("command");
    handleCommand(command.value);
    command.value = "";
  });

  const commandOpen = localStorage.getItem("command-open");
  if (commandOpen == null) {
    localStorage.setItem("command-open", "false");
  } else {
    setCommandOpen(commandOpen);
  }

  const sticky = localStorage.getItem("sticky");
  if (sticky == null) {
    localStorage.setItem("sticky", "true");
  } else {
    setSticky(sticky);
  }

  const toc = localStorage.getItem("toc");
  if (toc == null) {
    localStorage.setItem("toc", "true");
  } else {
    setToc(toc);
  }

  const find = localStorage.getItem("find");
  if (find != null && find.length > 0) {
    localStorage.removeItem("find");
    findCmd(find);
  }
});

function info(message) {
  const command = document.getElementsByClassName("command-input")[0];
  command.classList.remove("error");
  command.placeholder = message;
}

function err(message) {
  const command = document.getElementsByClassName("command-input")[0];
  command.classList.add("error");
  command.placeholder = message;
}

function setCommandOpen(open) {
  const command = document.getElementsByClassName("command-container")[0];
  info("Enter command here (try `help`)");
  if (open === "true") {
    command.classList.add("active");
    localStorage.setItem("command-open", "true");
    document.getElementById("command").focus();
  } else {
    command.classList.remove("active");
    localStorage.setItem("command-open", "false");
  }
}

function toggleCommand() {
  const open = localStorage.getItem("command-open");
  if (open === "true") {
    setCommandOpen("false");
  } else {
    setCommandOpen("true");
  }
}

function setDark(dark) {
  const root = document.getElementById("root");
  if (dark === "true") {
    root.classList.add("dark");
    localStorage.setItem("dark", "true");
  } else if (dark === "false") {
    root.classList.remove("dark");
    localStorage.setItem("dark", "false");
  }
}

function toggleDark() {
  const dark = localStorage.getItem("dark");
  if (dark === "true") {
    setDark("false");
  } else {
    setDark("true");
  }
}

function setToc(tocOpen) {
  const toc = document.getElementsByClassName("article-table-of-contents")[0];
  if (!toc) {
    return;
  }
  if (tocOpen === "true") {
    toc.classList.remove("hidden");
    localStorage.setItem("toc", "true");
  } else {
    toc.classList.add("hidden");
    localStorage.setItem("toc", "false");
  }
}

function toggleToc() {
  const toc = localStorage.getItem("toc");
  if (toc === "true") {
    setToc("false");
  } else {
    setToc("true");
  }
}

function setSticky(sticky) {
  const root = document.getElementById("root");
  if (sticky === "true") {
    root.classList.add("sticky");
    localStorage.setItem("sticky", "true");
  } else {
    root.classList.remove("sticky");
    localStorage.setItem("sticky", "false");
  }
}

function handleCommand(command) {
  if (!command) {
    return;
  }
  const cmd = command.toLowerCase().split(" ");
  if (cmd.length < 1) {
    return;
  }
  switch (cmd[0]) {
    case "toc":
      handleToc(cmd.slice(1));
      break;
    case "dark":
      handleDark(cmd.slice(1));
      break;
    case "pin":
      handlePin();
      break;
    case "unpin":
      handleUnpin();
      break;
    case "json":
      handleJson();
      break;
    case "cd":
      handleCd(cmd.slice(1));
      break;
    case "ls":
      handleLs(cmd.slice(1));
      break;
    case "find":
      handleFind(cmd.slice(1));
      break;
    case "exit":
      handleExit();
      break;
    default:
      err("Unknown command (see `help`)");
  }
}

function handleToc(cmd) {
  if (cmd.length === 0) {
    toggleToc();
  } else if (cmd[0] === "on") {
    setToc("true");
  } else if (cmd[0] === "off") {
    setToc("false");
  }
}

function handleDark(cmd) {
  if (cmd.length === 0) {
    toggleDark();
  } else if (cmd[0] === "on") {
    setDark("true");
  } else if (cmd[0] === "off") {
    setDark("false");
  }
}

function handleCd(cmd) {
  if (cmd.length !== 1) {
    return;
  }
  if (cmd[0] === "~") {
    window.location.href = window.location.origin;
    return;
  }
  window.location.href = window.location.origin + "/" + cmd[0];
}

function handlePin() {
  setSticky("true");
}

function handleUnpin() {
  handleExit();
}

function handleExit() {
  setSticky("false");
  setCommandOpen("false");
}

function handleJson() {
  window.location.href = window.location.origin + "/index.json";
}

function handleLs(cmd) {
  if (cmd.length === 0) {
    window.location.href = window.location.origin + "/tags";
  } else {
    window.location.href = window.location.origin + "/tags#" + cmd[0];
  }
}

function handleFind(cmd) {
  window.location.href = window.location.origin + "/blog";
  localStorage.setItem('find', cmd.join(' '))
}

function findCmd(cmd) {
  const commands = cmd.toLowerCase().split(" ");
  find(cmd);
}

function find(
  search,
  title = true,
  content = true,
  date = true,
  featured = false,
  regex = false
) {
  const oldList = document.getElementById("list");
  const newList = document.createElement("ul");
  info('Searching...')
  fetch(`${window.location.origin}/index.json`)
    .then(response => response.json())
    .then(data => {
      let blog = data.blog
      // if (featured) {
        blog = blog.filter(b => b.Parameters.featured === true)
      // }

      return blog
    })
    .catch((err) => {
      err('Error in searching...')
      console.error(err)
    })
    .then(blog => {
      const count = document.getElementsByClassName('list-count')[0]
      count.textContent = `${blog.length} post${blog.length === 1 ? '' : 's'}`
      fillBlog(newList, blog)
      oldList.replaceWith(newList);
    })
}

function fillBlog(list, blog) {
  for (const b of blog) {
    const li = document.createElement('li')
    li.classList.add('list-item')

    const time = document.createElement('div')
    time.classList.add('list-time')

    const timeSpan = document.createElement('span')
    timeSpan.textContent = b.FormattedDate
    time.appendChild(timeSpan)

    li.appendChild(time)

    const outerDiv = document.createElement('div')
    const linkDiv = document.createElement('div')

    const link = document.createElement('a')
    link.textContent = b.Title
    link.href = b.RelPermalink
    linkDiv.appendChild(link)
    outerDiv.appendChild(linkDiv)

    const tagDiv = document.createElement('div')
    for (const tag of b.Parameters.tags) {
      const tagLink = document.createElement('a')
      tagLink.textContent = tag
      tagLink.href = "/tags#" + tag
      tagLink.classList.add('tag')
      tagDiv.appendChild(tagLink)
    }
    outerDiv.appendChild(tagDiv)

    li.appendChild(outerDiv)
    list.appendChild(li)
  }
}