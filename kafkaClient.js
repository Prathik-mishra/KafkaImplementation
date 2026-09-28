const { Kafka } = require("kafkajs");

// Use KAFKA_BROKERS=kafka1:9092 when the scripts run in the Compose network.
// From the host machine, localhost:9092 is the usual broker address.
const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092')
  .split(',')
  .map((broker) => broker.trim())
  .filter(Boolean);

if (brokers.length === 0) {
  throw new Error('KAFKA_BROKERS must contain at least one broker, e.g. localhost:9092');
}

exports.Kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'kafka-home-cli',
    brokers
});


/* -- for adding SSL Certificate to the kafka client

ssl: {
    rejectUnauthorized: false,
    ca: [fs.readFileSync('/my/custom/ca.crt', 'utf-8')],
    key: fs.readFileSync('/my/custom/client-key.pem', 'utf-8'),
    cert: fs.readFileSync('/my/custom/client-cert.pem', 'utf-8')
  },


  -- run docker container 
  docker run -p 9092:9092 apache/kafka:latest
*/