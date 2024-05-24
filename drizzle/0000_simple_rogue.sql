CREATE TABLE `budgets` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`name` text,
	`amount` integer,
	`type` text,
	`is_starred` integer,
	`is_paid` integer
);
