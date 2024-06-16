import { Prop } from "../environment-config/prop.decorator";

export class DBConfig {
  @Prop("DB_NAME", "test_db")
  name: string;

  @Prop("DB_USERNAME", "test_user")
  username: string;

  @Prop("DB_PASSWORD", "test_password")
  password: string;

  @Prop("DB_HOST", "test_host")
  host: string;

  @Prop("DB_PORT", 5432)
  port: number;

  @Prop("ENABLE_LOGGING", false)
  logging: boolean;
}
