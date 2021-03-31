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
            handleCommandDark(cmd.slice(1))
            break
        case 'cd':
            handleCommandCd(cmd.slice(1))
            break
    }
}

function handleCommandDark(cmd) {
    if (cmd.length === 0) {
        toggleDark()
    } else if (cmd[0] === 'on') {
        setDark('true')
    } else if (cmd[0] === 'off') {
        setDark('false')
    }
}

function handleCommandCd(cmd) {
    if (cmd.length !== 1) {
        return
    }
    if (cmd[0] === '~') {
        window.location.href = window.location.origin
        return
    }
    window.location.href = window.location.origin + '/' + cmd[0]
}