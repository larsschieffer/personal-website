---
title: Database Containerisation
published: 2023-06-18
summary:
  An easy setup to always have a database server running for your local
  development
thumbnail: /blog/thumbnails/bookshelf.webp
---

## The reason

In general, I would rather not repeat myself. Occasionally, it happens that I'm
developing on a small hobby project and I need a database to implement a needed
feature. In those situations, I would rather not waste any time of setting up a
database server. Therefore, I decided to always have a PostgreSQL database
server running. The whole server should be quick to setup and easy to maintain,
such that I don't have to deal with it in the future again. In the end, I chose
a containerized solution, which I want to share with you right now.

## Why Should You Use A Container?

The latest trends of cloud native development allow to easily start software on
any operating system. It doesn't matter whether you are using Linux, macOS or
Windows. The following setup works for all of them. You can easily change your
database server, change their release versions or you can change your operating
system. Overall, it made sense to me to have an operating system agnostic
solution because then I can be sure that the database connection will even work
after a deployment, too.

## Prerequisites

You only need two things to go along with this guide. The first one is that you
have to have a running container engine. The guide uses docker, but everything I
show you should work for e.g. podman, too. Furthermore, you should know a bit of
how to navigate with your terminal. With that said, let's start setting up your
database environment.

## Why Should You Use A Docker-Compose File?

Normally, you don't need a docker compose file for a single docker container.
But, the maintainability is so much better than using a long, not understandable
docker command. Additionally, you can add the docker-compose file to your
version control system, such that everybody of your team can use it.

### The Docker-Compose File

Now, let's start to create your `docker-compose.yml` file with the following
content.

```yml
version: "3.8"

services:
  db:
    image: postgres:alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    volumes:
      - db:/var/lib/postgresql/data

volumes:
  db:
    driver: local
```

- The **postgres:alpine** image contains a small
  [Alpine Linux](https://www.alpinelinux.org/) distribution with a
  [PostgreSQL](https://www.postgresql.org/) database server. Therefore, the
  overall container size stays in its appropriate limits.
- With **always** as **restart policy**, the container automatically starts
  without a manual step from your side.
- The environment variables `POSTGRES_USER=postgres` and
  `POSTGRES_PASSWORD=postgres` are used to create a database user with
  **postgres** as username and **postgres** as password.
- The **5432:5432** port mapping allows the access to the database server inside
  the container on port **5432** on your local machine, without further
  configuration
- If you update your database server, you don't want to lose your development
  data. Volumes allow having persistent data between container runs. You would
  rather not share those volumes with other services, so that a **local** driver
  is sufficient. The volume **db** persists the content of the directory
  `/var/lib/postgresql/data` in the container, which is the data location for
  PostgreSQL.

### Starting Your Docker-Compose Setup

Finally, you can start the docker-compose setup with the following command:

```sh
$ docker compose up -d                                                 ✘ INT
[+] Running 9/9
 ✔ db 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                          12.4s
   ✔ 8c6d1654570f Pull complete                                                                                            0.9s
   ✔ d285f268e220 Pull complete                                                                                            0.9s
   ✔ a4388b4d68d1 Pull complete                                                                                            0.9s
   ✔ 7f8d1bfa3d3b Pull complete                                                                                            9.8s
   ✔ 94da97297dcb Pull complete                                                                                            9.8s
   ✔ 8262b2843785 Pull complete                                                                                            9.8s
   ✔ c368c6a56404 Pull complete                                                                                            9.8s
   ✔ 60f35adbbf32 Pull complete                                                                                            9.8s
[+] Building 0.0s (0/0)
[+] Running 2/2
 ✔ Network postgresql_default  Created                                                                                     0.0s
 ✔ Container postgresql-db-1   Started                                                                                     0.3s
```

## Create Your Database

Let's create the first database together. Therefore, you need to know the name
of the running database server container. You can find its name with the
following command:

```sh
$ docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Image}}"
NAMES             PORTS                    IMAGE
postgresql-db-1   0.0.0.0:5432->5432/tcp   postgres:alpine
```

You can see that the container has the name **postgresql-db-1**. Connecting
inside the container works as follows:

```sh
$ docker exec -it postgresql-db-1 psql  -U postgres
psql (15.3)
Type "help" for help.

postgres=#
```

And finally, you can create your database:

```sh
postgres=# create database <NAME_OF_YOUR_DB>;
CREATE DATABASE
postgres=#
```

You are done 👏! You created a containerised database server, which you can use
for your applications. If you used the same values in the `docker-compose.yml`
from the previous section, the following works to connect the application with
the database:

```
postgresql://postgres:postgres@localhost:5432/<NAME_OF_YOUR_DB>
```

## Always Running

If you want to have your database server always running, you have to make sure
to that the container engine automatically starts after you log in. If you are
using [Docker Desktop](https://www.docker.com/products/docker-desktop/) you can
tick the checkbox next to **"Start Docker Desktop when you log in"** in the
**General** settings of the application to achieve this.

## Maintaining Your Database Server

You already achieved to have a running database server. But after some months,
you want to update the server to the latest version, without losing the data of
your applications. This can be done with the following three steps.

### Stop Your Docker-Compose Network

```sh
$ docker compose down
[+] Running 2/1
 ✔ Container postgresql-db-1   Removed  0.1s
 ✔ Network postgresql_default  Removed  0.0s
```

### Remove The Old Container Image

```sh
$ docker image rm "postgres:alpine"
Untagged: postgres:alpine
Untagged: postgres@sha256:48d8422c6ae570a5bda52f07548b8e65dd055ac0b661f25b44b20e8cff2f75f0
Deleted: sha256:de94692755c654a26143ec778033d59ae74cc29bc1fd3b0f0515244fdcb464c1
Deleted: sha256:e5098c5ca0c10e36c5f1605838467200b588f51087cc3909016b4e159550f528
Deleted: sha256:0075d9359be83de6eb7595bfdcc13478f327b983b522935318cfb2ffe8a93296
Deleted: sha256:8a4a7e02572cbc8d3bb0c4c6c1250a08867296ca027244cc7f176839eb0d4539
Deleted: sha256:fb9991a96ff16a5512e6f8d23d0e9939c938ad8299bb9146e304317ddbff4f1e
Deleted: sha256:e78c4c50f79926db6d5fdc9ce894ca0f4eac42517bf0ca11142ece82741533b6
Deleted: sha256:4f3ba20889a28a9682d50c541d8d010a87fa454f1f351f97e7d071de2fde84ed
Deleted: sha256:d41d627abfb8fbafb1361694e82f87a68c6b61bc59d262dc8fb1a804c9c003a6
Deleted: sha256:61f2871f545a9b23a9340f96b331fb660b43008a9e84a03ad8564271bce5743b
```

### Start The Docker-Compose Network again

```sh
$ docker compose up -d                                                 ✘ INT
[+] Running 9/9
 ✔ db 8 layers [⣿⣿⣿⣿⣿⣿⣿⣿]      0B/0B      Pulled                                                                          12.4s
   ✔ 8c6d1654570f Pull complete                                                                                            0.9s
   ✔ d285f268e220 Pull complete                                                                                            0.9s
   ✔ a4388b4d68d1 Pull complete                                                                                            0.9s
   ✔ 7f8d1bfa3d3b Pull complete                                                                                            9.8s
   ✔ 94da97297dcb Pull complete                                                                                            9.8s
   ✔ 8262b2843785 Pull complete                                                                                            9.8s
   ✔ c368c6a56404 Pull complete                                                                                            9.8s
   ✔ 60f35adbbf32 Pull complete                                                                                            9.8s
[+] Building 0.0s (0/0)
[+] Running 2/2
 ✔ Network postgresql_default  Created                                                                                     0.0s
 ✔ Container postgresql-db-1   Started                                                                                     0.3s
```

And that's it. You successfully updated your database server to the latest
version without losing your data.

### All together

Finally, you can combine those three steps in a single command so that you don't
need to wait for each step to finish.

```sh
$ docker compose down \
&& docker image rm "postgres:alpine" \
&& docker compose up -d
```

## Summary

This post was all about setting up a database server for your local development.
You can use it for all your projects, which need a database, without any further
configuration. In the example above, I used PostgreSQL as my database server,
but you can easily achieve the same results with
[DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
or [MongoDB](https://hub.docker.com/_/mongo/).
