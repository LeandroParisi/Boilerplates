/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TYPE "roles" AS ENUM (
      'admin',
      'user'
    );
    
    CREATE TABLE "user" (
      "id" SERIAL PRIMARY KEY,
      "name" varchar NOT NULL,
      "email" varchar UNIQUE NOT NULL,
      "password" varchar NOT NULL,
      "daily_calories_threshold" int DEFAULT 2100,
      "monthly_expenses_threshold" int DEFAULT 1000,
      "role" roles,
      "isActive" boolean DEFAULT true,
      "created_at" timestamp DEFAULT now(),
      "updated_at" timestamp
    );
    
    CREATE TABLE "food" (
      "id" SERIAL PRIMARY KEY,
      "user_id" int,
      "name" varchar NOT NULL,
      "calories" decimal NOT NULL,
      "price" decimal,
      "isActive" boolean DEFAULT true,
      "taken_at" timestamp DEFAULT now()
    );
    
    ALTER TABLE "food" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE public.food;
    DROP TABLE public.user;
    DROP TYPE public.roles;
  `)
};
