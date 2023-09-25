import amqp from "amqplib";

const amqpServer = "amqp://localhost:5672";

export const publishConnection = async (queue: string, data: any) => {
  try {
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};

export const consumeConnection = async (queue: string) => {
  try {
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.assertQueue(queue);
    await channel.consume(queue, async (message: any) => {
      const myData = JSON.parse(message.content.toString());

      console.log(myData);
      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};
