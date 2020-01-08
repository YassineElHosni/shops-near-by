-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 08, 2020 at 03:15 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- Database: `db_shops`
--

create database if not exists `db_shops`;

use `db_shops`;


--
-- Table structure for table `user`
--

CREATE TABLE if not exists `user`(
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(30) UNIQUE,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `user` AUTO_INCREMENT=1000;

--
-- Table structure for table `shops`
--

CREATE TABLE if not exists `shops` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `image` varchar(30) NOT NULL,
  `longitude` varchar(30) NOT NULL,
  `latitude` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `shops` AUTO_INCREMENT=1000;

--
-- inserting data for table `shops`
--

INSERT INTO `shops` (`name`, `image`, `longitude`, `latitude`) VALUES
('Microland', '', '-6.851237', '34.003058'),
('Infodis', '', '-6.850231', '34.004120'),
('Itelsys', '', '-6.851171', '34.003978'),
('Treshiq', '', '-6.847632', '34.002817'),
('Isolda shop', '', '-6.848205', '34.004143'),
('EJ medic', '', '-6.847629', '34.004175'),
('Learning Design', '', '-6.847473', '34.004272');

--
-- Table structure for table `liked_shops`
--

CREATE TABLE if not exists `liked_shops` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `shop_id` int,
  `user_id` int,
  CONSTRAINT `liked_shops_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `liked_shops_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shops` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `liked_shops` AUTO_INCREMENT=1000;


COMMIT;