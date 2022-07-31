using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using POSSolution.Application;
using POSSolution.Core.Models;

namespace POSSolution.Infrastructure.ModelRepository
{
    public class Repository<T> : IRepository<T>  where T : class
    {
        private readonly POSContext posContext;

        private  DbSet<T> _Table; 
        public Repository(POSContext posContext)
        {
            this.posContext = posContext;
            _Table = posContext.Set<T>();
        }
        public async Task Delete(int Id)
        {
            T model = _Table.Find(Id);
            if (model != null)
            {
                _Table.Remove(model);
                await posContext.SaveChangesAsync();
            }
           
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return   await _Table.ToListAsync();
        }

        public async Task<T> GetOne(int Id)
        {
            return await _Table.FindAsync(Id);

        }

        public async Task<T> Insert(T model)
        {
           var result = await _Table.AddAsync(model);
            await posContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task Update(T model)
        {
            if (model != null)
            {
                _Table.Attach(model);
                posContext.Entry(model).State = EntityState.Modified;
                await posContext.SaveChangesAsync();
            }

        }
    }
}
