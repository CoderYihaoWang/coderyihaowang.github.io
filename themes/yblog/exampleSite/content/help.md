---
title: "Command Pallete Reference Manual"
date: 2021-04-04T13:49:07+12:00
tags: []
featured: false
draft: false
---

## Quick Start

Here are some frequently used commands to get you started:

```shell
> ls golang       # list all articles with the `golang` tag

> find golang     # find all articles with `golang` in the title or content

> cd blog         # go to the `Blog` page

> dark            # toggle dark mode

> toc             # toggle the display of table of contents

> exit            # exit command pallete mode
```

## Detailed Usages

### > help

Display the usage of a certain command.

**Usage**:
```shell
> help [command] # Display the usage of a certain command
```

**Examples**:
```shell
> help           # Display this help page
> help find      # Display the usage of `find` command
```

### > cd

Go to a page.

**Usage**:
```shell
> cd <page>       # Go to a particular page
```

**Examples**:
```shell
> cd blog         # Go to the `Blog` page
> cd ~            # Go to home page
> cd some-article # Go to the blog with the title `Some Article`
```

### > ls

List all articles with a particular tag.

**Usage**:
```shell
> ls [tag]        # List all articles with a particular tag
```

**Examples**:
```shell
> ls              # Go to the tags listing page (equivalent to `cd tags`)
> ls golang       # List all ariticles with the tag `golang`
```

### > find

Search articles.

**Usage**:
```shell
> find [--title] [-t] 
       [--content] [-c] 
       [--date] [-d]
       [--featured] [-f] 
       [--regex] [-r] 
       [searchQuery]

# List all articles that contains the `searchQuery` argument

# When --title or -t is presenet, search in title;
# When --content or -c is present, search in content;
# When --date or -d is present, search in date.

# The above three arguments can be used in combination,
# When none of the three is present, the search is done in title, content AND date

# When --featured or -f is present, only show the articles with
#   `featured` parameter set to `true`

# When --regex or -r is present, the `searchQuery` argument is
#   treated as a regular expression

# When the `searchQuery` argument is not given, it matches any article

# The `seatchQuery` argument can be multiple words, the order is preserved
```

**Examples**:
```shell
# Find all articles that contain the key word `golang` in title, content or date
> find golang  

# Find articles that contains `golang` only in title
> find golang --title
> find --title golang # same as above
> find -t golang      # same as above

# Find articles that contains `2021` in content or title, but don't search in date
> find 2021 --title --content
> find 2021 -t -c # same as above
> find 2021 -tc   # same as above

# Find articles whose title starts with `JavaScript` or `TypeScript`
> find ^(Java|Type)Script --regex --title
> find -tr ^(Java|Type)Script # same as above

# Find articles that contain `command line` in the content
> find -c command line

# Find all featured articles
> find --featured
> find -f

# Find all articles (equivalent to `cd blog`)
> find
```

### > exit

Exit command pallete mode and unpin the top bar.

**Usage**:
```shell
> exit
```

### > pin

Pin the top bar.

**Usage**:
```shell
> pin
```

### > unpin

Unpin the top bar and exit command pallete mode, equivalent to `exit`

**Usage**:
```shell
> unpin
```

### > dark

Set dark mode.

**Usage**:
```shell
> dark [on|off]      # Set or toggle dark mode
```

**Examples**:
```shell
> dark               # Toggle dark mode
> dark on            # Turn on dark mode
> dark off           # Turn off dark mode
```

### > toc

Set the display of table of contents.

_Note: Table of contents can only be displayed for articles (not `home` page or `projects`)_

**Usage**:
```shell
> toc [on|off]      # Set or toggle the display of table on contents
```

**Examples**:
```shell
> toc               # Toggle the display oftable of contents
> toc on            # Turn on table of contents
> toc off           # Turn off table of contents
```

### > json

Retrieve the JSON representation of this blog site.

**Usage**:
```shell
> json
```