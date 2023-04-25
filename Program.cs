using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PlayFlix.Repositories;


    var builder = WebApplication.CreateBuilder(args);

    //var fbApp = FirebaseApp.Create();

    // Add services to the container.

    builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var securitySchema = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme.",
        Type = SecuritySchemeType.ApiKey,
        In = ParameterLocation.Header,
        Reference = new OpenApiReference
        {
            Id = "Bearer",
            Type = ReferenceType.SecurityScheme,
        }
    };

    c.AddSecurityDefinition("Bearer", securitySchema);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            { securitySchema, new[] { "Bearer"} }
        });

});

var firebaseProjectId = builder.Configuration.GetValue<string>("FirebaseProjectId");
var googleTokenUrl = $"https://securetoken.google.com/{firebaseProjectId}";

//vvvvvvvvvvvvvvvvvvvv Add Dependency Injections Here vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
builder.Services.AddTransient<IGenreRepository, GenreRepository>();
            builder.Services.AddTransient<IGamesRepository, GamesRepository>();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IFavoriteGamesRepository, FavoriteGamesRepository>();
//^^^^^^^^^^^^^^^^^^^^ Add Dependency Injections here ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
     .AddJwtBearer(options =>
     {
         options.Authority = googleTokenUrl;
         options.TokenValidationParameters = new TokenValidationParameters
         {
             ValidateIssuer = true,
             ValidIssuer = googleTokenUrl,
             ValidateAudience = true,
             ValidAudience = firebaseProjectId,
             ValidateLifetime = true
         };
     });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(options =>
    {
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
        options.AllowAnyHeader();
    });
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();