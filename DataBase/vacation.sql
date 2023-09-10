-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: vacation
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/main
CREATE DATABASE IF NOT EXISTS vacation;

USE vacation;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `userKey` int NOT NULL,
  `vacationKey` int NOT NULL,
  KEY `userKey` (`userKey`),
  KEY `vacationKey` (`vacationKey`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`userKey`) REFERENCES `users` (`userKey`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`vacationKey`) REFERENCES `vacations` (`vacationKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (2,5),(2,9),(2,6),(2,8),(2,1),(4,8),(4,10),(4,7),(4,2),(4,3),(5,4),(5,10),(5,1),(5,3),(6,6),(6,1),(6,3),(6,5),(7,2),(7,3),(7,9),(8,2),(8,7),(8,8),(9,3),(9,1),(9,6),(10,6),(10,5),(10,9),(10,6),(10,2),(10,9),(11,6),(11,5),(11,10),(12,6),(12,3),(13,6),(13,9),(13,7),(14,4),(14,8),(14,10),(15,6),(15,3),(15,5),(16,14),(16,11),(16,12),(15,16),(15,13),(14,11),(14,12),(13,16),(13,13),(13,12),(12,16),(12,12),(12,15),(9,11),(9,14),(9,16),(6,15),(6,16),(6,11),(2,15),(2,14),(3,11),(3,6),(3,3);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userKey` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(90) NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_cs DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`userKey`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mister','admin','admin@admin.admin','AdMiN','admin'),(2,'sir','shnitzel','shnitzel@gmail.com','shnitzel','user'),(3,'yossi','blabla','blabla@gmail.com','blabla','user'),(4,'misho','masho','misho@gmail.com','misho','user'),(5,'ahmed','hmed','ahmed@gmail.com','123123','user'),(6,'avner','ben nar','avner@gmail.com','asdasd','user'),(7,'nadav','blabla','nadav@gmail.com','nadav','user'),(8,'yo','yo','yoyo@gmail.com','yoyoyo','user'),(9,'fun','ny','funny@gmail.com','funny','user'),(10,'no','yes','nogmail@yahoo.com','nogmail','user'),(11,'max','maxin','maxim@walla.com','maxim','user'),(12,'bill','bi','bilbi@hotmail.com','bilbi','user'),(13,'val','hallla','viking@gmail.com','viking','user'),(14,'ben','dover','dover@gmail.com','dover','user'),(15,'mike','hunt','hunt@gmail.com','hunt','user'),(16,'donald','duck','donald@gmail.com','duck','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationKey` int NOT NULL AUTO_INCREMENT,
  `vacationDestiny` varchar(45) NOT NULL,
  `vacationDesc` varchar(400) NOT NULL,
  `vacationStart` varchar(45) NOT NULL,
  `vacationEnd` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `photoFile` varchar(90) NOT NULL,
  PRIMARY KEY (`vacationKey`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'London - England','London is one of the most popular cities in the world. It’s home to charming pubs, world-class (and often free) museums, tons of history, some of the best theater performances in the world, a diverse population, incredible food, and a wild nightlife.','20/05/2023','27/05/2023',1299,'london.jpg'),(2,'Paris - France',' known as the most romantic city in the world, and is home to some world famous sights that are constantly shown in travel magazines, movies, and other works of art','21/05/2023','09/08/2023',1999,'paris.png'),(3,'Rio de Janeiro - Brazil','Rio de Janeiro is the second largest city in Brazil, on the South Atlantic coast. Rio is famous for its breathtaking landscape, its laid-back beach culture and its annual carnival.','01/07/2023','03/08/2023',5999,'Rio-de-Janeiro.jpg'),(4,'Dubai - UAE ','Dubai is a city of superlatives, home to the world\'s tallest tower, one of the world\'s largest shopping malls, and one of the world\'s largest man-made marinas… but on a smaller scale, this emirate is still tied to its days as a modest port town. ','31/05/2023','31/08/2023',7999,'dubai.png'),(5,'Las Vegas - USA','Whatever you can dream up, Las Vegas delivers: Michelin-starred restaurants, 24-hour wedding chapels, larger-than-life scenery, slot machines, all of it. But just when you think you have Vegas pinned down, it surprises you.','02/08/2023','27/11/2023',9000,'Las-Vegas.jpg'),(6,'Madrid - Spain','In Madrid, you can feel the true essence of Spain, in its elegant architecture, the life in its plazas and the delicious cuisine. Madrid has art bursting from the seams: the museums of the capital are packed with true jewels, from the leading painters and sculptors in history.\nHALA MADRID!!!','01/06/2023','04/07/2023',3450,'madrid.jpg'),(7,'Rome - Italy','The ancient seat of the progenitors of Western Civilisation, Rome is a classic European city that is a mix of historic ruins, stunning works of art & architecture, great food and a vibrant city life.','06/07/2023','31/07/2023',1600,'rome.jpg'),(8,'Bangkok - Thailand','Vibrant, colourful, loud, smoky, bustling, exciting, turbo-charged, and conversely, often peaceful… all these adjectives appropriately describe Bangkok. Known as Krungthep in Thai.','08/11/2023','05/04/2024',8500,'bangkok.jpeg'),(9,'Buenos Aires - Argentina','Buenos Aires is a pulsating, passionate, cosmopolitan city. The combination of rich architectural and cultural heritage, modern creative energy, electric nightlife, unique traditions and much more.','10/06/2023','12/10/2023',6890,'BuenosAires.jpeg'),(10,'Medellin - Colombia','Medellín is located in a bowl in the Andes mountains, meaning that wherever you go in the city you are basically guaranteed a view of mountains and stunning landscapes.','05/10/2023','01/01/2024',4780,'medellin.jpg'),(11,'Hawaii - USA','World-class beaches, pristine rainforests, and sizzling volcanoes are just a few things that make Hawaii a happening hotspot for tourists. Every Hawaiian Island has its own draw.','08/06/2023','10/08/2023',7890,'hawaii.jpeg'),(12,'Amsterdam - Netherlands','Amsterdam is known for its historical attractions, for its collections of great art, and for the distinctive colour and flavour of its old sections, which have been so well preserved.','17/08/2023','01/09/2023',2450,'amsterdam.jpg'),(13,'Seoul - South Korea','Tourists can experience distinctive harmony between historical cultural heritage and modern culture. enjoy local cultures, natural environments, and unique food.','01/01/2024','10/02/2024',5880,'seoul.jpeg'),(14,'Lima - Peru','Lima offers travelers a chance to experience a vibrant, dynamic city that is full of history, culture, museums, boutiques, and amazing Pacific sunsets.Lima is one of the food capitals of the world.','04/07/2023','20/09/2023',6780,'Lima.jpeg'),(15,'Sydney - Australia','Sydney is a stunning and vibrant city built around one of the most beautiful bays in the world with sparkling beaches and easy access to the heart of the city.','30/08/2024','08/01/2025',5680,'sydney .jpeg'),(16,'Tokyo - Japan','Tokyo is known for iconic landmarks like the Tokyo Skytree and Shibuya Crossing. It\'s famous for its sakura tree-lined streets, shrines and temples, its otaku culture and wonderful cuisine.','27/02/2024','11/04/2024',7890,'Tokyo.jpeg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-13 13:39:55
