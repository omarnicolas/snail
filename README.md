# snail

An Express.js API example using async/await and MongoDB

## Installation

Install dependencies

```sh
$ npm install
```

Set environment variable

```sh
$ export MONGODB_URL="mongodb://localhost:27017/db"
```

Build docker image

```sh
$ docker build -t username/snail .
```

## Run

Run in development mode

```bash
$ npm run start-dev
```

Run in debug mode

```sh
$ npm run start-debug
```

Run in production mode

```sh
$ npm start
```

Run with docker

```sh
$ docker run -p 8000:8000 -e MONGODB_URL=$MONGODB_URL username/snailapp
```

## The MIT License

Copyright (c) 2018 - Omar Nicolas

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
