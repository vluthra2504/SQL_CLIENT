# SQL Client

## Installation

Requires [Docker and Docker-compose](https://docs.docker.com/compose/install/) v1.29+ to run1.

Pull the repository
**_Using docker and docker-compose:_**

```sh
git pull
```

```sh
docker-compose build --no-cache
```

```sh
docker-compose up -d
```

## Docker

Once done, you can access the client as well as server running on ports 3000 and 5000 respectively

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000                                              #React-Client
```

```sh
127.0.0.1:5000                                              #Express-API
```

> Note: The Above Docker Commands wont build a proper container, as `host.docker.internal` does not resolves to an IP address allowing network access to the host incase of ***Linux***.
Issue Link:  ```https://github.com/docker/for-linux/issues/264```

## THANK YOU :)
