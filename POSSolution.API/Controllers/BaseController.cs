using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using POSSolution.Application;
using POSSolution.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using POSSolution.Core.Models;
using POSSolution.Core.Common.Models;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase where TEntity : BaseModel
    {
        private readonly POSContext context;
        protected DbSet<TEntity> _dbSet { get; set; }
        public BaseController(POSContext context)
        {
            this.context = context;
            _dbSet = context.Set<TEntity>();
            
        }
        //Get: api/controller
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TEntity>>> GetAllAsync()
        {
            try
            {
                return Ok(await _dbSet.ToListAsync());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                  "Error retrieving data from the database");
            }

        }

        //Get: api/controller/id
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> GetAsync([FromRoute] int id)
        {
            try
            {

                var result = await _dbSet.Where(e => e.Id == id).FirstOrDefaultAsync();
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound($"{id} not found");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }

        }

        //Delete: api/controller/id
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> DeleteAsync([FromRoute] int id)
        {
            try
            {
                var entity = await _dbSet.Where(e => e.Id == id).FirstOrDefaultAsync();
                if (entity == null)
                {
                    return BadRequest();
                }
                else
                {
                    _dbSet.Remove(entity);
                    await context.SaveChangesAsync();
                    return NoContent();
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleteing record from the database");
            }
            
            
        }

        //Post: api/controller
        [HttpPost]
        public virtual async Task<ActionResult<TEntity>> CreateAsync([FromBody] TEntity entity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                else
                {
                    await _dbSet.AddAsync(entity);
                    await context.SaveChangesAsync();
                    return Ok(entity);
                }
        }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new  record");
    }
}

        //Put: api/cotroller/id
        [HttpPut("{id}")]
        public virtual async Task<ActionResult<TEntity>> UpdateAsync([FromRoute] int id, [FromBody] TEntity entity)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != entity.Id)
                {
                    return BadRequest();
                }
                var result = _dbSet.Find(entity.Id);
                if (result == null)
                {
                    return NotFound("Record not found");
                }
                else
                {
                    _dbSet.Update(entity);
                    await context.SaveChangesAsync();

                }
            }
            catch (DbUpdateConcurrencyException)
            {

            }
            catch (DbUpdateException)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                     "Error updating the record");
            }
            return NoContent();

        }
    }
}

