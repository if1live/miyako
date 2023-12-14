import mqtt from "mqtt";

const host = process.env.MQTT_HOST || "127.0.0.1";
const username = process.env.MQTT_USERNAME || "guest";
const password = process.env.MQTT_PASSWORD || "guest";

// naive mqtt
// const url_mqtt = `mqtt://${username}:${password}@${host}:1883`;
// const client = mqtt.connect(url_mqtt);

// mqtt over websocket
const url_ws =
  host.startsWith("localhost") || host.startsWith("127.0.0.1")
    ? `ws://${username}:${password}@${host}:15675/ws`
    : `wss://${username}:${password}@${host}/ws`;

console.log(url_ws);
const client = mqtt.connect(url_ws);

client.on("error", (e) => {
  console.log("error", e);
  process.exit(1);
});

client.on("connect", async () => {
  console.log("connect");

  const topic = "/priv/room/sample";

  const result = await client.subscribeAsync(topic);
  console.log("subscribe", result);

  const message = `now: ${new Date().toISOString()}`;
  await client.publishAsync(topic, message);
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(topic, message.toString());
  client.end();
});
