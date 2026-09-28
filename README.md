# Kafka Home

This project is created with reference to the official [KafkaJS Documentation](https://kafka.js.org/docs/admin).

---

## Architecture & Components

### 1. Server-Side Kafka
To run a local Kafka broker instance, you can use Docker. The service typically runs on the default port `9092`.

**Docker Commands:**
* Interactive mode:
  ```bash
  docker run -it -p 9092:9092 apache/kafka:latest
  ```
* Background mode:
  ```bash
  docker run -d -p 9092:9092 apache/kafka:latest
  ```

This Kafka service will be utilized by the client-side services mentioned below.

---

### 2. Client-Side Kafka

#### 2.1 Kafka Admin
The Kafka Admin interface is used for infrastructure setup and cluster management (such as creating topics and partitions). It handles connecting to brokers running on `localhost:9092`.

##### 2.1.1 Setup Kafka Client
```javascript
const { Kafka } = require("kafkajs");

const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092')
  .split(',')
  .map((broker) => broker.trim())
  .filter(Boolean);

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'kafka-home-cli',
  brokers
});

const admin = kafka.admin();
await admin.connect();
/* -- Kafka operations -- */
await admin.disconnect();
```

##### 2.1.2 List Topics
`listTopics` lists the names of all existing topics and returns an array of strings. The method will throw exceptions in case of errors.
```javascript
await admin.listTopics();
```

##### 2.1.3 Create Topics
`createTopics` resolves to `true` if the topic was created successfully or `false` if it already exists. The method will throw exceptions in case of errors.
```javascript
await admin.createTopics({
    validateOnly: <boolean>,
    waitForLeaders: <boolean>,
    timeout: <Number>,
    topics: <ITopicConfig[]>,
});
```

##### 2.1.4 `ITopicConfig` Structure
```javascript
{
    topic: <String>,
    numPartitions: <Number>,       // default: -1 (uses broker `num.partitions` configuration)
    replicationFactor: <Number>,   // default: -1 (uses broker `default.replication.factor` configuration)
    replicaAssignment: <Array>,    // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
    configEntries: <Array>         // Example: [{ name: 'cleanup.policy', value: 'compact' }] - default: []
}
```

##### 2.1.5 Delete Topics
```javascript
await admin.deleteTopics({
    topics: <String[]>,
    timeout: <Number>, // default: 5000
});
```

#### 2.2 Kafka Producer
*(Pending implementation)*

#### 2.3 Kafka Consumer
*(Pending implementation)*