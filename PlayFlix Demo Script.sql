USE [master]
GO
IF DB_ID('PlayFlix') IS NULL
	CREATE DATABASE [PlayFlix]
GO
USE [PlayFlix]
GO

DROP TABLE IF EXISTS [favoriteGames];
DROP TABLE IF EXISTS [RatedGames];
DROP TABLE IF EXISTS [UserProfiles];
DROP TABLE IF EXISTS [Games]; 
DROP TABLE IF EXISTS [genre];
DROP TABLE IF EXISTS [User];

CREATE TABLE [Games] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [Title] nvarchar(255),
  [Description] nvarchar(255),
  [Rating] int,
  [Genre] int,
  [GameImg] nvarchar(255),
  [iframe] nvarchar(512)
)
GO

CREATE TABLE [genre] (
  [id] int PRIMARY KEY identity NOT NULL,
  [genreType] nvarchar(255)
)
GO


CREATE TABLE [User] (
  [Id] int PRIMARY KEY identity NOT NULL,
  [uId] nvarchar(255) NOT NULL,
  [Type] nvarchar(255),
)
GO

CREATE TABLE [favoriteGames] (
  [id] int PRIMARY KEY identity NOT NULL,
  [gameId] int,
  [userId] int
)
GO

CREATE TABLE [RatedGames] (
  [id] int PRIMARY KEY identity NOT NULL,
  [rating] int,
  [gameId] int,
  [userId] int,
  [review] nvarchar(500)
)
GO

CREATE TABLE [UserProfiles] (
	[Id] int PRIMARY KEY identity NOT NULL,
	[UserId] int NOT NULL,
	[ProfileImg] nvarchar(255),
	[FirstName] nvarchar(255),
	[LastName] nvarchar(255),
	[Bio] nvarchar(255)
)
GO

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Sonic Classic Heroes','Hedgehog Game',70,1,'https://info.sonicretro.org/images/thumb/0/08/Sonicclassicheroes.png/320px-Sonicclassicheroes.png', 'https://www.retrogames.cc/embed/42046-sonic-classic-heroes.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Super Mario All Stars NES','Mario as an All Star',80,2,'https://upload.wikimedia.org/wikipedia/en/3/3c/Super_Mario_All_Stars_%28game_box_art%29.jpg', 'https://www.retrogames.cc/embed/42845-super-mario-all-stars-nes.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Street Fighter II - Champion Edition','People who fight',55,3,'https://wiki.supercombo.gg/images/1/10/CEsplash.png', 'https://www.retrogames.cc/embed/10042-street-fighter-ii-champion-edition-yyc-bootleg-set-2-920313-etc-bootleg.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Baseball Stars 2','Baseball playing',20,4,'https://cdn.cloudflare.steamstatic.com/steam/apps/366230/header.jpg?t=1594105969', 'https://www.retrogames.cc/embed/7875-baseball-stars-2.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Zumas Revenge','Zuma makes you think',24,5,'https://upload.wikimedia.org/wikipedia/en/b/be/Zuma%27s_Revenge_cover.jpg', 'https://www.retrogames.cc/embed/44711-zuma-s-revenge-usa.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Mario Kart 64 - Amped Up','Mario driving on monster energy',70,6,'https://i.ytimg.com/vi/cHdxdByiio8/maxresdefault.jpg', 'https://www.retrogames.cc/embed/43654-mario-kart-64-amped-up-v2-80.html')

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Super Metroid','Metroid from japan!',4,1,'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Smetroidbox.jpg/220px-Smetroidbox.jpg', 'https://www.retrogames.cc/embed/16893-super-metroid-japan-usa-en-ja.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'The Legend of Zelda - A Link to the Past','Rescue the princess from the past!',3,2,'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg/220px-The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg', 'https://www.retrogames.cc/embed/44785-the-legend-of-zelda-a-link-to-the-past-title-skip-and-full-hearts.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Soul Calibur','OG soul caliber experence',5,3,'https://upload.wikimedia.org/wikipedia/en/4/45/Soulcalibur_flyer.png', 'https://www.retrogames.cc/embed/43585-soul-calibur-world-soc14-ver-c.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tony Hawks Pro Skater','Original pro skater',3,4,'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/TonyHawksProSkaterPlayStation1.jpg/220px-TonyHawksProSkaterPlayStation1.jpg', 'https://www.retrogames.cc/embed/32423-tony-hawk-s-pro-skater-usa-rev-a.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tetris','Original Tetris',2,5,'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Typical_Tetris_Game.svg/220px-Typical_Tetris_Game.svg.png', 'https://www.retrogames.cc/embed/17612-tetris-usa.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Crash Team Racing','Crash bandicot on the race track',5,6,'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/CrashTeamRacingNACover.png/220px-CrashTeamRacingNACover.png', 'https://www.retrogames.cc/embed/41687-crash-team-racing.html')

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Resident Evil 2','Zombies number 2 edition!',70,1,'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/NTSC_Resident_Evil_2_Cover.png/220px-NTSC_Resident_Evil_2_Cover.png', 'https://www.retrogames.cc/embed/32505-resident-evil-2-usa-rev-a.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Pacman','The original pacman!',80,2,'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Pac_flyer.png/220px-Pac_flyer.png', 'https://www.retrogames.cc/embed/9406-pac-man-midway-1.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tekken 3','People who fight in Tekken!',55,3,'https://upload.wikimedia.org/wikipedia/en/9/98/Tekken3Box.jpg', 'https://www.retrogames.cc/embed/40238-tekken-3.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tactical Soccer','ractically play soccar!',20,4,'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Retro_Bowl_cover.png/220px-Retro_Bowl_cover.png', 'https://www.retrogames.cc/embed/23944-tactical-soccer-japan.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Dream Maze','Maze game!',24,5,'https://upload.wikimedia.org/wikipedia/en/3/3c/Mr_do_arcade.png', 'https://www.retrogames.cc/embed/19712-kigurumi-daibouken-dream-maze-japan.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Top Gear','Like the show but in a game!',70,6,'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/SNES_Top_Gear_cover_art.jpg/220px-SNES_Top_Gear_cover_art.jpg', 'https://www.retrogames.cc/embed/23881-top-gear-usa.html')

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Sonic Classic Heroes','Hedgehog Game',70,1,'https://info.sonicretro.org/images/thumb/0/08/Sonicclassicheroes.png/320px-Sonicclassicheroes.png', 'https://www.retrogames.cc/embed/42046-sonic-classic-heroes.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Super Mario All Stars NES','Mario as an All Star',80,2,'https://upload.wikimedia.org/wikipedia/en/3/3c/Super_Mario_All_Stars_%28game_box_art%29.jpg', 'https://www.retrogames.cc/embed/42845-super-mario-all-stars-nes.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Street Fighter II - Champion Edition','People who fight',55,3,'https://wiki.supercombo.gg/images/1/10/CEsplash.png', 'https://www.retrogames.cc/embed/10042-street-fighter-ii-champion-edition-yyc-bootleg-set-2-920313-etc-bootleg.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Baseball Stars 2','Baseball playing',20,4,'https://cdn.cloudflare.steamstatic.com/steam/apps/366230/header.jpg?t=1594105969', 'https://www.retrogames.cc/embed/7875-baseball-stars-2.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Zumas Revenge','Zuma makes you think',24,5,'https://upload.wikimedia.org/wikipedia/en/b/be/Zuma%27s_Revenge_cover.jpg', 'https://www.retrogames.cc/embed/44711-zuma-s-revenge-usa.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Mario Kart 64 - Amped Up','Mario driving on monster energy',70,6,'https://i.ytimg.com/vi/cHdxdByiio8/maxresdefault.jpg', 'https://www.retrogames.cc/embed/43654-mario-kart-64-amped-up-v2-80.html')

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Super Metroid','Metroid from japan!',4,1,'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Smetroidbox.jpg/220px-Smetroidbox.jpg', 'https://www.retrogames.cc/embed/16893-super-metroid-japan-usa-en-ja.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'The Legend of Zelda - A Link to the Past','Rescue the princess from the past!',3,2,'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg/220px-The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg', 'https://www.retrogames.cc/embed/44785-the-legend-of-zelda-a-link-to-the-past-title-skip-and-full-hearts.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Soul Calibur','OG soul caliber experence',5,3,'https://upload.wikimedia.org/wikipedia/en/4/45/Soulcalibur_flyer.png', 'https://www.retrogames.cc/embed/43585-soul-calibur-world-soc14-ver-c.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tony Hawks Pro Skater','Original pro skater',3,4,'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/TonyHawksProSkaterPlayStation1.jpg/220px-TonyHawksProSkaterPlayStation1.jpg', 'https://www.retrogames.cc/embed/32423-tony-hawk-s-pro-skater-usa-rev-a.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tetris','Original Tetris',2,5,'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Typical_Tetris_Game.svg/220px-Typical_Tetris_Game.svg.png', 'https://www.retrogames.cc/embed/17612-tetris-usa.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Crash Team Racing','Crash bandicot on the race track',5,6,'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/CrashTeamRacingNACover.png/220px-CrashTeamRacingNACover.png', 'https://www.retrogames.cc/embed/41687-crash-team-racing.html')

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Resident Evil 2','Zombies number 2 edition!',70,1,'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/NTSC_Resident_Evil_2_Cover.png/220px-NTSC_Resident_Evil_2_Cover.png', 'https://www.retrogames.cc/embed/32505-resident-evil-2-usa-rev-a.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Pacman','The original pacman!',80,2,'https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Pac_flyer.png/220px-Pac_flyer.png', 'https://www.retrogames.cc/embed/9406-pac-man-midway-1.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tekken 3','People who fight in Tekken!',55,3,'https://upload.wikimedia.org/wikipedia/en/9/98/Tekken3Box.jpg', 'https://www.retrogames.cc/embed/40238-tekken-3.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tactical Soccer','ractically play soccar!',20,4,'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Retro_Bowl_cover.png/220px-Retro_Bowl_cover.png', 'https://www.retrogames.cc/embed/23944-tactical-soccer-japan.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Dream Maze','Maze game!',24,5,'https://upload.wikimedia.org/wikipedia/en/3/3c/Mr_do_arcade.png', 'https://www.retrogames.cc/embed/19712-kigurumi-daibouken-dream-maze-japan.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Top Gear','Like the show but in a game!',70,6,'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/SNES_Top_Gear_cover_art.jpg/220px-SNES_Top_Gear_cover_art.jpg', 'https://www.retrogames.cc/embed/23881-top-gear-usa.html')

INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Super Metroid','Metroid from japan!',4,1,'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Smetroidbox.jpg/220px-Smetroidbox.jpg', 'https://www.retrogames.cc/embed/16893-super-metroid-japan-usa-en-ja.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'The Legend of Zelda - A Link to the Past','Rescue the princess from the past!',3,2,'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg/220px-The_Legend_of_Zelda_A_Link_to_the_Past_SNES_Game_Cover.jpg', 'https://www.retrogames.cc/embed/44785-the-legend-of-zelda-a-link-to-the-past-title-skip-and-full-hearts.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Soul Calibur','OG soul caliber experence',5,3,'https://upload.wikimedia.org/wikipedia/en/4/45/Soulcalibur_flyer.png', 'https://www.retrogames.cc/embed/43585-soul-calibur-world-soc14-ver-c.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tony Hawks Pro Skater','Original pro skater',3,4,'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/TonyHawksProSkaterPlayStation1.jpg/220px-TonyHawksProSkaterPlayStation1.jpg', 'https://www.retrogames.cc/embed/32423-tony-hawk-s-pro-skater-usa-rev-a.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Tetris','Original Tetris',2,5,'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Typical_Tetris_Game.svg/220px-Typical_Tetris_Game.svg.png', 'https://www.retrogames.cc/embed/17612-tetris-usa.html')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Crash Team Racing','Crash bandicot on the race track',5,6,'https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/CrashTeamRacingNACover.png/220px-CrashTeamRacingNACover.png', 'https://www.retrogames.cc/embed/41687-crash-team-racing.html')

INSERT INTO dbo.genre([genreType]) VALUES ( 'Action')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Adventure')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Fighting')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Sports')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Puzzles')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Racing')


INSERT INTO dbo.[User]([uId],[Type]) VALUES ( 'uid1234','General Type')
INSERT INTO dbo.[User]([uId],[Type]) VALUES ( 'uid5678','General Type')

INSERT INTO dbo.[UserProfiles]([UserId],[FirstName],[LastName],[Bio],[ProfileImg]) VALUES (1,'John','Ligma','I am a man','https://images.fineartamerica.com/images/artworkimages/medium/3/ligma-helda-monica-transparent.png')
INSERT INTO dbo.[UserProfiles]([UserId],[FirstName],[LastName],[Bio],[ProfileImg]) VALUES (2,'Buddy','Boy','I am a boy','https://m.media-amazon.com/images/I/51H+n2N0aqL._UXNaN_FMjpg_QL85_.jpg')

INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 1,1)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 2,1)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 3,1)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 3,2)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 4,2)


INSERT INTO dbo.RatedGames( [rating], [gameId],[userId], [review]) VALUES ( 5, 1,1, 'My favorite game')
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 40, 2,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 23, 3,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 70, 4,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 85, 5,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 90, 3,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 23, 2,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 44, 1,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 47, 5,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 60, 4,2)

ALTER TABLE [favoriteGames] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [favoriteGames] ADD FOREIGN KEY ([gameId]) REFERENCES [Games] ([Id])
GO

ALTER TABLE [Games] ADD FOREIGN KEY ([Genre]) REFERENCES [genre] ([id])
GO

ALTER TABLE [RatedGames] ADD FOREIGN KEY ([gameId]) REFERENCES [Games] ([Id])
GO

ALTER TABLE [RatedGames] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [UserProfiles] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])