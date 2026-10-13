CREATE TABLE `fund_comparisons` (
	`id` text PRIMARY KEY NOT NULL,
	`fund_id` text NOT NULL,
	`month` text NOT NULL,
	`checked_at` text NOT NULL,
	`payload` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `comparison_month_idx` ON `fund_comparisons` (`month`,`fund_id`);--> statement-breakpoint
CREATE TABLE `app_documents` (
	`key` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`checked_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `fund_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`fund_id` text NOT NULL,
	`month` text NOT NULL,
	`reporting_date` text NOT NULL,
	`checked_at` text NOT NULL,
	`payload` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `fund_month_idx` ON `fund_snapshots` (`month`,`fund_id`);--> statement-breakpoint
CREATE TABLE `investor_portfolios` (
	`id` text PRIMARY KEY NOT NULL,
	`investor_id` text NOT NULL,
	`checked_at` text NOT NULL,
	`payload` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `investor_date_idx` ON `investor_portfolios` (`investor_id`,`checked_at`);--> statement-breakpoint
CREATE TABLE `research_reports` (
	`id` text PRIMARY KEY NOT NULL,
	`checked_at` text NOT NULL,
	`model` text,
	`fingerprint` text NOT NULL,
	`payload` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `report_date_idx` ON `research_reports` (`checked_at`);