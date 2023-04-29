USE [master]
GO
IF DB_ID('PlayFlix') IS NULL
	CREATE DATABASE [PlayFlix]
GO
USE [PlayFlix]
GO

DROP TABLE IF EXISTS [Games]; 
DROP TABLE IF EXISTS [genre];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [favoriteGames];
DROP TABLE IF EXISTS [RatedGames];


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
  [ProfileImg] nvarchar(255),
  [Id] int PRIMARY KEY identity NOT NULL,
  [uId] nvarchar(255),
  [Type] nvarchar(255),
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Bio] nvarchar(255)
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




INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Sonic Classic Heroes','Hedgehog Game',4,1,'https://info.sonicretro.org/images/thumb/0/08/Sonicclassicheroes.png/320px-Sonicclassicheroes.png', '<iframe src="https://www.retrogames.cc/embed/42046-sonic-classic-heroes.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Super Mario All Stars NES','Mario as an All Star',3,2,'https://upload.wikimedia.org/wikipedia/en/3/3c/Super_Mario_All_Stars_%28game_box_art%29.jpg', '<iframe src="https://www.retrogames.cc/embed/42845-super-mario-all-stars-nes.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Street Fighter II - Champion Edition','People who fight',5,3,'https://wiki.supercombo.gg/images/1/10/CEsplash.png', '<iframe src="https://www.retrogames.cc/embed/10042-street-fighter-ii-champion-edition-yyc-bootleg-set-2-920313-etc-bootleg.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Baseball Stars 2','Baseball playing',3,4,'https://cdn.cloudflare.steamstatic.com/steam/apps/366230/header.jpg?t=1594105969', '<iframe src="https://www.retrogames.cc/embed/7875-baseball-stars-2.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Zumas Revenge','Zuma makes you think',2,5,'https://upload.wikimedia.org/wikipedia/en/b/be/Zuma%27s_Revenge_cover.jpg', '<iframe src="https://www.retrogames.cc/embed/44711-zuma-s-revenge-usa.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>')
INSERT INTO dbo.[Games]([Title],[Description],[Rating],[Genre],[GameImg],[iframe]) VALUES ( 'Mario Kart 64 - Amped Up','Mario driving on monster energy',5,6,'https://i.ytimg.com/vi/cHdxdByiio8/maxresdefault.jpg', '<iframe src="https://www.retrogames.cc/embed/43654-mario-kart-64-amped-up-v2-80.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>')


INSERT INTO dbo.genre([genreType]) VALUES ( 'Action')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Adventure')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Fighting')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Sports')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Puzzles')
INSERT INTO dbo.genre([genreType]) VALUES ( 'Racing')


INSERT INTO dbo.[User]([uId],[Type],[FirstName],[LastName],[Bio],[ProfileImg]) VALUES ( 'uid1234','General Type','John','Ligma','I am a man','https://images.fineartamerica.com/images/artworkimages/medium/3/ligma-helda-monica-transparent.png')
INSERT INTO dbo.[User]([uId],[Type],[FirstName],[LastName],[Bio],[ProfileImg]) VALUES ( 'uid5678','General Type','Buddy','Boy','I am a boy','https://m.media-amazon.com/images/I/51H+n2N0aqL._UXNaN_FMjpg_QL85_.jpg')


INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 1,1)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 2,1)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 3,1)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 3,2)
INSERT INTO dbo.favoriteGames([gameId],[userId] ) VALUES ( 4,2)


INSERT INTO dbo.RatedGames( [rating], [gameId],[userId], [review]) VALUES ( 5, 1,1, 'My favorite game')
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 4, 2,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 2, 3,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 4, 4,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 2, 5,1)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 1, 3,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 2, 2,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 3, 1,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 2, 5,2)
INSERT INTO dbo.RatedGames( [rating], [gameId],[userId]) VALUES ( 1, 4,2)

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
