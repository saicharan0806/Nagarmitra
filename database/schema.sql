-- ====================================================================
-- CivicSync - Civic Complaint Management System Database Schema
-- Target Database Engine: MySQL 8.0+ / MariaDB 10.4+
-- Character Set: utf8mb4 (Full Unicode, emoji, multilingual support)
-- ====================================================================

CREATE DATABASE IF NOT EXISTS `civisync_db` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE `civisync_db`;

-- --------------------------------------------------------------------
-- 1. Departments Table
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `feedback`;
DROP TABLE IF EXISTS `complaint_logs`;
DROP TABLE IF EXISTS `complaints`;
DROP TABLE IF EXISTS `workers`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL UNIQUE,
    `code` VARCHAR(30) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `contact_email` VARCHAR(150) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 2. Users Table (Citizens, Managers, Workers, Admins)
-- --------------------------------------------------------------------
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(25) NULL,
    `role` ENUM('citizen', 'manager', 'worker', 'admin') NOT NULL DEFAULT 'citizen',
    `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_role` (`role`),
    INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 3. Workers Profile Table
-- --------------------------------------------------------------------
CREATE TABLE `workers` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL UNIQUE,
    `department_id` INT NOT NULL,
    `designation` VARCHAR(100) NOT NULL DEFAULT 'Field Operations Worker',
    `badge_number` VARCHAR(50) NOT NULL UNIQUE,
    `status` ENUM('available', 'assigned', 'off_duty') NOT NULL DEFAULT 'available',
    `skills` VARCHAR(255) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_workers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_workers_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT,
    INDEX `idx_workers_status` (`status`),
    INDEX `idx_workers_department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 4. Complaints Table
-- --------------------------------------------------------------------
CREATE TABLE `complaints` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `tracking_id` VARCHAR(40) NOT NULL UNIQUE,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(80) NOT NULL,
    `ai_predicted_category` VARCHAR(80) NULL,
    `ai_confidence` DECIMAL(5, 2) NULL,
    `severity` ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
    `status` ENUM('pending', 'verified', 'assigned', 'in_progress', 'resolved', 'rejected') NOT NULL DEFAULT 'pending',
    `citizen_id` INT NOT NULL,
    `department_id` INT NULL,
    `assigned_worker_id` INT NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `address` VARCHAR(255) NULL,
    `landmark` VARCHAR(150) NULL,
    `image_url` VARCHAR(500) NULL,
    `proof_image_url` VARCHAR(500) NULL,
    `resolution_notes` TEXT NULL,
    `resolved_at` DATETIME NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_complaints_citizen` FOREIGN KEY (`citizen_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_complaints_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_complaints_worker` FOREIGN KEY (`assigned_worker_id`) REFERENCES `workers` (`id`) ON DELETE SET NULL,
    INDEX `idx_complaints_status` (`status`),
    INDEX `idx_complaints_category` (`category`),
    INDEX `idx_complaints_tracking` (`tracking_id`),
    INDEX `idx_complaints_department` (`department_id`),
    INDEX `idx_complaints_worker` (`assigned_worker_id`),
    INDEX `idx_complaints_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 5. Complaint Audit Timeline Logs
-- --------------------------------------------------------------------
CREATE TABLE `complaint_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `complaint_id` INT NOT NULL,
    `actor_id` INT NULL,
    `action` VARCHAR(80) NOT NULL,
    `note` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_logs_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_logs_actor` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
    INDEX `idx_logs_complaint` (`complaint_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 6. Citizen Feedback Table
-- --------------------------------------------------------------------
CREATE TABLE `feedback` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `complaint_id` INT NOT NULL UNIQUE,
    `citizen_id` INT NOT NULL,
    `rating` TINYINT NOT NULL CHECK (`rating` BETWEEN 1 AND 5),
    `comments` TEXT NULL,
    `is_satisfied` BOOLEAN NOT NULL DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_feedback_complaint` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_feedback_citizen` FOREIGN KEY (`citizen_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    INDEX `idx_feedback_rating` (`rating`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ====================================================================
-- SEED DATA (Default departments, staff, workers, and sample tickets)
-- ====================================================================

-- Departments
INSERT INTO `departments` (`id`, `name`, `code`, `description`, `contact_email`) VALUES
(1, 'Roads & Infrastructure', 'ROADS', 'Maintenance of roads, potholes, pedestrian walkways and bridges', 'roads@nagarmitra.gov.in'),
(2, 'Sanitation & Waste Management', 'SANITATION', 'Garbage clearing, waste bin management, street sweeping', 'sanitation@nagarmitra.gov.in'),
(3, 'Electrical & Public Lighting', 'ELECTRICAL', 'Streetlights, electrical hazards, public grids', 'electrical@nagarmitra.gov.in'),
(4, 'Water Supply & Sewerage', 'WATER', 'Pipeline bursts, drainage overflow, water quality', 'water@nagarmitra.gov.in'),
(5, 'Parks & Environment', 'PARKS', 'Tree maintenance, fallen branches, public parks upkeep', 'parks@nagarmitra.gov.in');

-- Seed Users (Passwords are hashed representations of 'password123')
INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `phone`, `role`) VALUES
(1, 'Municipal Administrator', 'admin@nagarmitra.gov.in', 'scrypt:32768:8:1$placeholder$hashadmin', '+91 98201-11000', 'admin'),
(2, 'Eng. Rajesh Patel (Manager)', 'rajesh.patel@roads.nagarmitra.gov.in', 'scrypt:32768:8:1$placeholder$hashmanager', '+91 98201-11001', 'manager'),
(3, 'Ramesh Kumar (Road Worker)', 'ramesh.kumar@worker.nagarmitra.gov.in', 'scrypt:32768:8:1$placeholder$hashworker1', '+91 98201-11002', 'worker'),
(4, 'Sunita Devi (Sanitation Worker)', 'sunita.devi@worker.nagarmitra.gov.in', 'scrypt:32768:8:1$placeholder$hashworker2', '+91 98201-11003', 'worker'),
(5, 'Aarav Sharma (Citizen)', 'aarav@citizen.nagarmitra.gov.in', 'scrypt:32768:8:1$placeholder$hashcitizen', '+91 98765-43210', 'citizen');

-- Seed Workers
INSERT INTO `workers` (`id`, `user_id`, `department_id`, `designation`, `badge_number`, `status`, `skills`) VALUES
(1, 3, 1, 'Senior Asphalt Technician', 'ROADS-W01', 'assigned', 'Asphalt repair, heavy machinery, road resurfacing'),
(2, 4, 2, 'Waste Operations Lead', 'SAN-W02', 'available', 'Hazardous clean up, refuse collection, bin repair');

-- Seed Complaints
INSERT INTO `complaints` (`id`, `tracking_id`, `title`, `description`, `category`, `ai_predicted_category`, `ai_confidence`, `severity`, `status`, `citizen_id`, `department_id`, `assigned_worker_id`, `latitude`, `longitude`, `address`, `landmark`, `image_url`, `created_at`) VALUES
(1, 'CIVIC-2026-00101', 'Severe Bitumen Pothole on Outer Ring Road', 'Deep crater-like pothole damaging car suspensions and causing hazardous sudden swerving during peak hours.', 'pothole', 'pothole', 95.40, 'high', 'assigned', 5, 1, 1, 17.439930, 78.397040, 'Near Pillar 142, Outer Ring Road Junction, Gachibowli, Hyderabad, Ward 8', 'Opposite Cyber Towers', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600', NOW() - INTERVAL 2 DAY),
(2, 'CIVIC-2026-00102', 'Overflowing Community Waste Bins near Gandhi School', 'Municipal community dumpsters overflowing across the pedestrian footpath with foul odor and health hazard.', 'garbage_dump', 'garbage_dump', 92.10, 'medium', 'pending', 5, 2, NULL, 17.442100, 78.385000, 'Opposite Gandhi Senior Secondary School, Patel Nagar, Ward 3', 'Near Bus Stop', 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600', NOW() - INTERVAL 4 HOUR),
(3, 'CIVIC-2026-00103', 'High-Voltage Streetlight Cable Sparking on Utility Pole', 'Exposed street lamp wiring sparking during evening rains, dangerous for pedestrians and commuters.', 'street_light', 'street_light', 88.50, 'critical', 'in_progress', 5, 3, NULL, 17.431200, 78.401200, 'Near Gate 2, Shivaji Market Road, Ward 12', 'Near Junction Circle', 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600', NOW() - INTERVAL 1 DAY);

-- Seed Logs
INSERT INTO `complaint_logs` (`complaint_id`, `actor_id`, `action`, `note`) VALUES
(1, 5, 'created', 'Complaint submitted via citizen web portal.'),
(1, 1, 'ai_classified', 'AI classification confirmed pothole with 95.40% confidence.'),
(1, 2, 'assigned', 'Manager assigned complaint to Ramesh Kumar (ROADS-W01).'),
(2, 5, 'created', 'Complaint submitted via citizen web portal.'),
(2, 1, 'ai_classified', 'AI classification tagged garbage_dump with 92.10% confidence.');
