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

  document.getElementById("command").addEventListener("change", () => {
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
  const cmd = command.toLowerCase().split(/\s+/);
  if (cmd.length < 1) {
    return;
  }
  const rest = cmd.slice(1);
  switch (cmd[0]) {
    case "toc":
      handleToc(rest);
      break;
    case "dark":
      handleDark(rest);
      break;
    case "pin":
      handlePin(rest);
      break;
    case "unpin":
      handleUnpin(rest);
      break;
    case "json":
      handleJson(rest);
      break;
    case "cd":
      handleCd(rest);
      break;
    case "ls":
      handleLs(rest);
      break;
    case "find":
      handleFind(rest);
      break;
    case "exit":
      handleExit(rest);
      break;
    case "help":
      handleHelp(rest);
      break;
    default:
      err("unknown command (see `help`)");
  }
}

function handleToc(cmd) {
  if (cmd.length === 0) {
    toggleToc();
  } else if (cmd[0] === "on") {
    setToc("true");
  } else if (cmd[0] === "off") {
    setToc("false");
  } else {
    err("toc: invalid args");
  }
}

function handleDark(cmd) {
  if (cmd.length === 0) {
    toggleDark();
  } else if (cmd[0] === "on") {
    setDark("true");
  } else if (cmd[0] === "off") {
    setDark("false");
  } else {
    err("dark: invalid args");
  }
}

function handleCd(cmd) {
  if (cmd.length !== 1) {
    err("cd: invalid args");
    return;
  }
  if (cmd[0] === "~" || cmd[0] === "home") {
    window.location.href = window.location.origin;
    return;
  }
  window.location.href = window.location.origin + "/" + cmd[0];
}

function handlePin(cmd) {
  if (cmd.length !== 0) {
    err("pin: invalid args");
    return;
  }
  setSticky("true");
}

function handleUnpin(cmd) {
  if (cmd.length !== 0) {
    err("unpin: invalid args");
    return;
  }
  handleExit();
}

function handleExit(cmd) {
  if (cmd.length !== 0) {
    err("exit: invalid args");
    return;
  }
  setSticky("false");
  setCommandOpen("false");
}

function handleJson(cmd) {
  if (cmd.length !== 0) {
    err("json: invalid args");
    return;
  }
  window.location.href = window.location.origin + "/index.json";
}

function handleLs(cmd) {
  if (cmd.length === 0) {
    window.location.href = window.location.origin + "/tags";
  } else if (cmd.length > 1) {
    err("ls: invalid args");
    return;
  } else {
    window.location.href = window.location.origin + "/tags#" + cmd[0];
  }
}

function handleFind(cmd) {
  window.location.href = window.location.origin + "/blog";
  localStorage.setItem("find", cmd.join(" "));
}

function findCmd(cmd) {
  const commands = cmd.toLowerCase().split(" ");
  let title = false;
  let content = false;
  let date = false;
  let featured = false;
  let regex = false;

  let shortOptions = "";

  let search = "";

  for (const c of commands) {
    if (c.startsWith("--")) {
      switch (c.substring(2)) {
        case "title":
          title = true;
          break;
        case "content":
          content = true;
          break;
        case "date":
          date = true;
          break;
        case "featured":
          featured = true;
          break;
        case "regex":
          regex = true;
          break;
        default:
          err("find: invalid args");
          return;
      }
    } else if (c.startsWith("-")) {
      shortOptions += c.substring(1);
    } else {
      search = search + ' ' + c;
    }
  }

  for (const c of shortOptions) {
    switch (c) {
      case "t":
        title = true;
        break;
      case "c":
        content = true;
        break;
      case "d":
        date = true;
        break;
      case "f":
        featured = true;
        break;
      case "r":
        regex = true;
        break;
      default:
        err("find: invalid args");
        return;
    }
  }

  if (!title && !content && !date) {
    title = true;
    content = true;
    date = true;
  }

  find(search.trim(), title, content, date, featured, regex);
}

function find(search, title, content, date, featured, regex) {
  const oldList = document.getElementById("list");
  const newList = document.createElement("ul");
  info("Searching...");
  fetch(`${window.location.origin}/index.json`)
    .then((response) => response.json())
    .then((data) =>
      filter(data.blog, search, title, content, date, featured, regex)
    )
    .then((blog) => {
      const count = document.getElementsByClassName("list-count")[0];
      count.textContent = `${blog.length} post${blog.length === 1 ? "" : "s"}`;
      fillBlog(newList, blog);
      oldList.replaceWith(newList);
      return blog.length;
    })
    .then((count) => info(`${count} result${count === 1 ? "" : "s"}`))
    .catch((e) => {
      err("Error in searching...");
      console.error(e);
    });
}

function filter(blog, search, title, content, date, featured, regex) {
  if (featured) {
    blog = blog.filter((b) => b.Parameters.featured === true);
  }

  if (search.length === 0) {
    return blog;
  }

  const reg = new RegExp(search, "i");
  search = search.toLowerCase();

  let filter = (b) => false;

  if (title) {
    if (regex) {
      filter = appendFilter(filter, (b) => reg.test(b.Title));
    } else {
      filter = appendFilter(filter, (b) =>
        b.Title.toLowerCase().includes(search)
      );
    }
  }

  if (content) {
    if (regex) {
      filter = appendFilter(filter, (b) => reg.test(b.Content));
    } else {
      filter = appendFilter(filter, (b) =>
        b.Content.toLowerCase().includes(search)
      );
    }
  }

  if (date) {
    if (regex) {
      filter = appendFilter(filter, (b) => reg.test(b.PublishDate));
    } else {
      filter = appendFilter(filter, (b) =>
        b.PublishDate.toLowerCase().includes(search)
      );
    }
  }

  return blog.filter((b) => filter(b));
}

function appendFilter(f, newF) {
  return function (b) {
    return f(b) || newF(b);
  };
}

function fillBlog(list, blog) {
  for (const b of blog) {
    const li = document.createElement("li");
    li.classList.add("list-item");

    const time = document.createElement("div");
    time.classList.add("list-time");

    const timeSpan = document.createElement("span");
    timeSpan.textContent = b.FormattedDate;
    time.appendChild(timeSpan);

    li.appendChild(time);

    const outerDiv = document.createElement("div");
    const linkDiv = document.createElement("div");

    const link = document.createElement("a");
    link.textContent = b.Title;
    link.href = b.RelPermalink;
    linkDiv.appendChild(link);
    outerDiv.appendChild(linkDiv);

    const tagDiv = document.createElement("div");
    if (b.Parameters.tags) {
      for (const tag of b.Parameters.tags) {
        const tagLink = document.createElement("a");
        tagLink.textContent = tag;
        tagLink.href = "/tags#" + tag;
        tagLink.classList.add("tag");
        tagDiv.appendChild(tagLink);
      }
    }
    outerDiv.appendChild(tagDiv);

    li.appendChild(outerDiv);
    list.appendChild(li);
  }
}

function handleHelp(cmd) {
  if (cmd.length === 0) {
    window.location.href = window.location.origin + "/help";
  } else if (cmd.length === 1) {
    window.location.href = window.location.origin + "/help#-" + cmd[0];
  } else {
    err("help: invalid args");
  }
}
