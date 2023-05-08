namespace PlayFlix.Models
{
    public class User
    {
        public int Id { get; set; }
        public string uId { get; set; }
        public string Type { get; set; }
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public string uId { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public string profileImg { get; set; }
        public string Type { get; set; }
    }
}
