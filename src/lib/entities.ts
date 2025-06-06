import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ValueTransformer,
} from "typeorm";

const transformer: Record<"date" | "bigint", ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
};

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: true })
  name!: string | null;

  @Column({ type: "varchar", nullable: true, unique: true })
  email!: string | null;

  @Column({ type: "varchar", nullable: true, transformer: transformer.date })
  emailVerified!: string | null;

  @Column({ type: "varchar", nullable: true })
  image!: string | null;

  @Column({ type: "varchar", nullable: true, default: "u" })
  role!: string | null;

  @OneToMany(() => SessionEntity, (session) => session.userId)
  sessions!: SessionEntity[];

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];
}

@Entity({ name: "accounts" })
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "varchar" })
  type!: string;

  @Column({ type: "varchar" })
  provider!: string;

  @Column({ type: "varchar" })
  providerAccountId!: string;

  @Column({ type: "varchar", nullable: true })
  refresh_token!: string | null;

  @Column({ type: "varchar", nullable: true })
  access_token!: string | null;

  @Column({
    nullable: true,
    type: "bigint",
    transformer: transformer.bigint,
  })
  expires_at!: number | null;

  @Column({ type: "varchar", nullable: true })
  token_type!: string | null;

  @Column({ type: "varchar", nullable: true })
  scope!: string | null;

  @Column({ type: "longtext", nullable: true })
  id_token!: string | null;

  @Column({ type: "varchar", nullable: true })
  session_state!: string | null;

  @Column({ type: "varchar", nullable: true })
  oauth_token_secret!: string | null;

  @Column({ type: "varchar", nullable: true })
  oauth_token!: string | null;

  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    createForeignKeyConstraints: true,
  })
  user!: UserEntity;
}

@Entity({ name: "sessions" })
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  sessionToken!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ type: "varchar", transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: UserEntity;
}

@Entity({ name: "verification_tokens" })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  token!: string;

  @Column({ type: "varchar" })
  identifier!: string;

  @Column({ type: "varchar", transformer: transformer.date })
  expires!: string;
}
