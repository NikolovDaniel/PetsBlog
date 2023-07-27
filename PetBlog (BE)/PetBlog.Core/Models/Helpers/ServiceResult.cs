namespace PetBlog.Core.Models.Helpers
{
    public class ServiceResult<T>
    {
        public T Data { get; set; }
        public List<string> Errors { get; private set; }

        public ServiceResult(T data)
        {
            Data = data;
            Errors = new List<string>();
        }

        public void AddError(string errorMessage)
        {
            Errors.Add(errorMessage);
        }
    }
}

