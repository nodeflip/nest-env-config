import { Prop } from "../environment-config/prop.decorator";

export class RabitMqConfig {
  @Prop("uri", "amqp://test:test@localhost:5672")
  uri: string;

  @Prop("exchange", "test_exchange")
  exchangeName: string;

  @Prop("queueExchangeName", "test_queue_exchange")
  queueExchange?: string;

  @Prop("queueName", "test_queue")
  queueName?: string;

  @Prop("queueRoutingKey", "test_routing_key")
  queueRoutingKey?: string;
}
