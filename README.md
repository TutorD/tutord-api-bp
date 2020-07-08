# TutorD

API

## MacOS Install
for macOS Mojave 10.14.x

install homebrew by typing the following command into your terminal `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
`

[homebrew](https://brew.sh)

install nvm

```text
brew update
brew install nvm
mkdir ~/.nvm
vim ~/.bash_profile
```

in your `.bash_profile` file add these lines
```text
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

then save, and go back to the terminal to test
```text
source ~/.bash_profile
echo $NVM_DIR
```

[install nvm](http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/)

install `node --version 14.5.0`

```text
nvm install 14.5.0
```


[install git](https://git-scm.com/book/en/v1/Getting-Started-Installing-Git#Installing-on-Mac)


```text
 brew install git
```

MongoDB 4.2.8

[install mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
[windows install mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
```text
 brew update
 brew tap mongodb/brew
 brew install mongodb-community@4.0
```

To verify run `mongod --config /usr/local/etc/mongod.conf` and use crt + c to quit

```text
brew services list
brew services start mongodb-community@4.0
```

to connect to your local mongodb instance
```text
mongo --verbose mongodb://127.0.0.1:27017/tutord
```

## Application Install
Make dev directory and clone project into directory

```text
mkdir -p ~/dev
cd ~/dev
git clone https://github.com/dammitBrandon/tutord.git
cd tutord-api-bp
```

install dependencies `npm install`

run node application
```text
npm run start
```




