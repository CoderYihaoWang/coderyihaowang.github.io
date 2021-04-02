addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === '`') {
        setSticky('true')
        setCommandOpen('true')
    }

    if (event.key.toLowerCase() === 'escape' || event.key.toLowerCase() === 'esc') {
        setCommandOpen('false')
    }
})

addEventListener('load', () => {
    const dark = localStorage.getItem('dark')
    if (dark == null) {
        localStorage.setItem('dark', 'false') 
    } else {
        setDark(dark)
    }

    document.body.style.visibility = 'visible';
    document.body.style.opacity = 1;

    document.getElementById('title').addEventListener('click', () => {
        toggleCommand()
    })

    document.getElementById('command').addEventListener('change', (event) => {
        const command = document.getElementById('command')
        handleCommand(command.value)
        command.value = ""
    })

    const commandOpen = localStorage.getItem('command-open')
    if (commandOpen == null) {
        localStorage.setItem('command-open', 'false')
    } else {
        setCommandOpen(commandOpen)
    }

    const sticky = localStorage.getItem('sticky')
    if (sticky == null) {
        localStorage.setItem('sticky', 'true')
    } else {
        setSticky(sticky)
    }

    const toc = localStorage.getItem('toc')
    if (toc == null) {
        localStorage.setItem('toc', 'true')
    } else {
        setToc(toc)
    }
})

function print(message) {
    document.getElementById('command').placeholder = message
}

function setCommandOpen(open) {
    const command = document.getElementsByClassName('command-container')[0]
    print('Enter command here (try `help`)')
    if (open === 'true') {
        command.classList.add('active')
        localStorage.setItem('command-open', 'true')
        document.getElementById('command').focus()
    } else {
        command.classList.remove('active')
        localStorage.setItem('command-open', 'false')
    }
}

function toggleCommand() {
    const open = localStorage.getItem('command-open')
    if (open === 'true') {
        setCommandOpen('false')
    } else {
        setCommandOpen('true')
    }
}

function setDark(dark) {
    const root = document.getElementById('root')
    if (dark === 'true') {
        root.classList.add('dark')
        localStorage.setItem('dark', 'true')
    } else if (dark === 'false') {
        root.classList.remove('dark')
        localStorage.setItem('dark', 'false')
    }
}

function toggleDark() {
    const dark = localStorage.getItem('dark')
    if (dark === 'true') {
        setDark('false')
    } else {
        setDark('true')
    }
}

function setToc(tocOpen) {
    const toc = document.getElementsByClassName('article-table-of-contents')[0]
    if (!toc) {
        return
    }
    if (tocOpen === 'true') {
        toc.classList.remove('hidden')
        localStorage.setItem('toc', 'true')
    } else {
        toc.classList.add('hidden')
        localStorage.setItem('toc', 'false')
    }
}

function toggleToc() {
    const toc = localStorage.getItem('toc')
    if (toc === 'true') {
        setToc('false')
    } else {
        setToc('true')
    }
}

function setSticky(sticky) {
    const root = document.getElementById('root')
    if (sticky === 'true') {
        root.classList.add('sticky')
        localStorage.setItem('sticky', 'true')
    } else {
        root.classList.remove('sticky')
        localStorage.setItem('sticky', 'false')
    }
}

function handleCommand(command) {
    if (!command) {
        return
    }
    const cmd = command.split(' ')
    if (cmd.length < 1) {
        return
    }
    switch(cmd[0]) {
        case 'toc':
            handleToc(cmd.slice(1))
            break
        case 'dark':
            handleDark(cmd.slice(1))
            break
        case 'cd':
            handleCd(cmd.slice(1))
            break
        case 'pin':
            handlePin()
            break
        case 'unpin':
            handleUnpin()
            break
        case 'exit':
            handleExit()
            break
    }
}

function handleToc(cmd) {
    if (cmd.length === 0) {
        toggleToc()
    } else if (cmd[0] === 'on') {
        setToc('true')
    } else if (cmd[0] === 'off') {
        setToc('false')
    }
}

function handleDark(cmd) {
    if (cmd.length === 0) {
        toggleDark()
    } else if (cmd[0] === 'on') {
        setDark('true')
    } else if (cmd[0] === 'off') {
        setDark('false')
    }
}

function handleCd(cmd) {
    if (cmd.length !== 1) {
        return
    }
    if (cmd[0] === '~') {
        window.location.href = window.location.origin
        return
    }
    window.location.href = window.location.origin + '/' + cmd[0]
}

function handlePin() {
    setSticky('true')
}

function handleUnpin() {
    handleExit()
}

function handleExit() {
    setSticky('false')
    setCommandOpen('false')
}