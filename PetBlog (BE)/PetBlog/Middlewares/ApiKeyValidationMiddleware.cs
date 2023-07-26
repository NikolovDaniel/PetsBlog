using System;
namespace PetBlog.Middlewares
{
    public class ApiKeyValidationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly string _apiKey;

        public ApiKeyValidationMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _apiKey = configuration.GetValue<string>("AppSettings:AccessKey");
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (IsExcludedAction(context))
            {
                await _next(context);
                return;
            }

            // Check if the "ApiKey" header exists in the request
            if (!context.Request.RouteValues.TryGetValue("apiKey", out var apiRouteValue))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }

            // Validate the API key
            if (!apiRouteValue.Equals(_apiKey))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }

            // API key is valid, continue processing the request
            await _next(context);
        }

        private bool IsExcludedAction(HttpContext context)
        {
            return context.Request.Path.StartsWithSegments("/api/Pets", StringComparison.OrdinalIgnoreCase)
              && context.Request.Method.Equals("GET", StringComparison.OrdinalIgnoreCase);
        }
    }
}

