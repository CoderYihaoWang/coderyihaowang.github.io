addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === '`') {
        setSticky('true')
        setCommandOpen('true')
    }
})

addEventListener('load', () => {
    document.getElementById('title').addEventListener('click', () => {
        toggleCommand()
    })

    document.getElementById('command').addEventListener('change', (event) => {
        const command = document.getElementById('command')
        handleCommand(command.value)
        command.value = ""
    })

    const dark = localStorage.getItem('dark')
    if (dark == null) {
        localStorage.setItem('dark', 'false') 
    } else {
        setDark(dark)
    }

    const autoDark = localStorage.getItem('auto-dark')


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
})

function setCommandOpen(open) {
    const command = document.getElementsByClassName('command-container')[0]
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
            handleExit(cmd.slice(1))
            break
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
    setSticky('false')
}

function handleExit(cmd) {
    setCommandOpen('false')
    if (cmd.length === 1 && (cmd[0] === '--unpin' ||cmd[0] === '-u')) {
        setSticky('false')
    } 
}