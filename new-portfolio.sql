-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 14, 2025 at 03:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new-portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `role` tinytext NOT NULL,
  `username` tinytext NOT NULL,
  `pfp_url` text NOT NULL DEFAULT 'default-user.webp',
  `password_hash` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` timestamp(6) NULL DEFAULT NULL,
  `auth_token_hash` tinytext NOT NULL,
  `auth_token_created_at` timestamp(6) NULL DEFAULT NULL,
  `refresh_token_hash` varchar(255) NOT NULL,
  `date_created` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `role`, `username`, `pfp_url`, `password_hash`, `email`, `email_verified`, `email_verified_at`, `auth_token_hash`, `auth_token_created_at`, `refresh_token_hash`, `date_created`) VALUES
(6, 'admin', 'ihawp', '', '$2b$10$.pSxBGzhvVFj4nmws7rfA.5y2fwdo1TW5T02e6DGsT9ZVOVYFDd9S', 'ihawp@ihawp.com', 1, '2025-06-13 07:52:21.518751', '', '2025-06-13 07:52:15.008646', '', '2025-06-07 05:37:36.749911');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `author` tinytext NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tags`)),
  `files` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`files`)),
  `date_created` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `content`, `author`, `tags`, `files`, `date_created`) VALUES
(49, 'asd', '[{\"id\":\"content1749857956349\",\"content\":\"asdadadsadadasdadasdasdasdas\"}]', 'asd', '[{\"id\":\"tags1749857959616\",\"tags\":\"asdadad\"},{\"id\":\"tags1749857960828\",\"tags\":\"asdadsadadadas\"}]', '[\"1749857968460-breakthrough-v2.webp\",\"1749857968460-shooting-star_result.webp\",\"1749857968460-s-l960.webp\",\"1749857968461-travel-canada.webp\"]', '2025-06-13 21:48:22.851101');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL,
  `title` tinytext NOT NULL,
  `intro` tinytext NOT NULL,
  `role` tinytext DEFAULT NULL,
  `timeline` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`timeline`)),
  `toolsUsed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`toolsUsed`)),
  `skillsApplied` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skillsApplied`)),
  `keyTasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`keyTasks`)),
  `challenges` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`challenges`)),
  `takeaways` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`takeaways`)),
  `solutionSummary` text DEFAULT NULL,
  `githubURL` text DEFAULT NULL,
  `projectSite` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `date_created` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `title`, `intro`, `role`, `timeline`, `toolsUsed`, `skillsApplied`, `keyTasks`, `challenges`, `takeaways`, `solutionSummary`, `githubURL`, `projectSite`, `images`, `date_created`) VALUES
(185, 'asd', 'asdasd', 'asd', '[{\"id\":\"timeline1749858020749\",\"date\":\"sdfsdfsdf\",\"title\":\"sdfsdfsdfsdfsdfs\",\"descriptor\":\"sdfsdfsdfds\"}]', '[\"faPhp\",\"faWordpress\",\"faHtml5\",\"faReact\"]', '[{\"id\":\"skillsApplied1749858017304\",\"skill\":\"df df dfdf \"}]', '[{\"id\":\"keyTasks1749858019277\",\"task\":\"fsdfsdfsdfsdfsfd\"}]', '[{\"id\":\"challenges1749858025118\",\"challenge\":\"sdfsdfsfsfsd\",\"solution\":\"fsdfsdfdsfds sdf sd fds fds ds fs fs fsd\"}]', '[{\"id\":\"takeaways1749858028325\",\"takeaway\":\"sd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf s\"},{\"id\":\"takeaways1749858034720\",\"takeaway\":\"sd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf s\"},{\"id\":\"takeaways1749858036409\",\"takeaway\":\"sd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf ssd sd fd fdf sdf fsdfsdfsd fsdf sdfsd sd fsdf sd fsfsdf sdf s\"}]', 'asdsadsad asdsa sad sa asd sa sad sad sa das', 'https://github.com', 'https://ihawp.com', '[\"1749858052692-breakthrough-v2.webp\",\"1749858052692-shooting-star_result.webp\",\"1749858052692-s-l960.webp\",\"1749858052692-travel-canada.webp\"]', '2025-06-13 21:47:10.469574');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=186;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
