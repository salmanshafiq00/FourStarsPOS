using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POSSolution.Application
{
    public interface IRepository<T>
    {
        public Task<IEnumerable<T>> GetAll();
        public Task<T> GetOne(int Id);
        public Task<T> Insert(T model);
        public Task Update(T model);
        public Task Delete(int Id);
    }
}
