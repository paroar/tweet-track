<p align="center">
  <a href="http://www.youtube.com/watch?v=z7r2QJebAxo" target="_blank"><img src="./resources/header-logo.png"/></a>
</p>


Overview
========
This is an application made for my Certificate of Higher Education (HNC). In this project, I attempted to learn the basics of big data and ETL, learning about the inconveniences of working with masive datasets and how to use the latests technologies to overcome them.

The project seizes data extraction, transformation and storage, and how to show data at realtime on a map via websockets.

Feel free to use this project.


Prerequisites
============

Before you continue, ensure you met the following requirements:

 * You have installed Docker.
 * You have installed Node.
 * You have a Twitter developer account.
 * Your machine has lots of ram 8GB+.


Env configuration file
======================

You must include an .env file configuration at root folder.<br> 

It is not encouraged to change fields except CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN and ACCESS_TOKEN_SECRET as some settings are not yet fully implemented.<br>

Should look something like this:

```
CONSUMER_KEY=ofutlGwF5bQb9zuMYtZJV5Ein
CONSUMER_SECRET=OTuI0BzYJDBHZpAHEuZt5TAxxFAAGbakSuRIUgvtHUZx7p2CHP
ACCESS_TOKEN=2316541718818398969-5zzhoW43OQnS6yo9Dy2fg7XgnCh5HM
ACCESS_TOKEN_SECRET=EYlYaXEJsMqBbd1kslGKkyBWxMNHGZRaO2YONqn42Bv2D
ELK_VERSION=7.6.2
ES_JAVA_OPTS=-Xmx1024m -Xms1024m
LS_JAVA_OPTS=-Xmx1024m -Xms1024m
NODE_PORT=8080
LOGSTASH_ES_PORT=5000
LOGSTASH_MONGO_PORT=5001
KIBANA_PORT=5601
DB_NAME=twitter
MONGO_PORT=27017
ELASTICSEARCH_PORT=9200
```

Installation
====================

Install dependencies:

```sh
$ npm install
```


Usage
=========

Launch frontend:

```sh
$ npm start
```

Launch services:

```sh
$ docker-compose up
```
