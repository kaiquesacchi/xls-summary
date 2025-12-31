CREATE TABLE `insurance_companies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `insurance_companies_name_unique` ON `insurance_companies` (`name`);--> statement-breakpoint
CREATE TABLE `insurance_consultants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cpf` text,
	`email` text NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `insurance_consultants_cpf_unique` ON `insurance_consultants` (`cpf`);--> statement-breakpoint
CREATE UNIQUE INDEX `insurance_consultants_email_unique` ON `insurance_consultants` (`email`);--> statement-breakpoint
CREATE TABLE `insurance_policies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`proposalId` text,
	`externalPolicyId` text,
	`externalPolicyNumber` text,
	`product` text,
	`paymentInstallment` text,
	`paymentTimestamp` integer,
	`paymentTotalAmount` integer,
	`paymentTotalCommission` integer,
	`policyHolderId` integer NOT NULL,
	`insuranceCompanyId` integer NOT NULL,
	`insuranceConsultantId` integer,
	`investmentConsultantId` integer,
	FOREIGN KEY (`policyHolderId`) REFERENCES `policy_holders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`insuranceCompanyId`) REFERENCES `insurance_companies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`insuranceConsultantId`) REFERENCES `insurance_consultants`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`investmentConsultantId`) REFERENCES `investment_consultants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `investment_consultants` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cpf` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `investment_consultants_cpf_unique` ON `investment_consultants` (`cpf`);--> statement-breakpoint
CREATE TABLE `policy_holders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cpf` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `policy_holders_cpf_unique` ON `policy_holders` (`cpf`);