﻿namespace PlayFlix.Models
{
    public class RatedGames
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int GameId { get; set; }
        public int UserId { get; set; }
    }
}
