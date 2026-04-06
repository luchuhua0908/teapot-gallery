CREATE TABLE `teapots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`clay_type` text NOT NULL,
	`maker` text NOT NULL,
	`capacity_ml` integer NOT NULL,
	`description` text,
	`image_url` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
