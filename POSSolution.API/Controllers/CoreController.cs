using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POSSolution.Application;
using POSSolution.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POSSolution.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoreController : ControllerBase
    {
        private readonly IRepository<Country> repository;

        public CoreController(IRepository<Country> repository)
        {
            this.repository = repository;
        }
        [HttpGet]
        public async Task<IActionResult> Countries()
        {
            try
            {
                return Ok(await repository.GetAll());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }

        }

        [HttpGet]
        [Route("{Id:int}")]
        public async Task<IActionResult> GetCountry(int Id)
        {
            try
            {
                var result = await repository.GetOne(Id);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }

        }

        [HttpPost]
        public async Task<IActionResult> CreateCountry([FromBody] Country country)
        {
            try
            {
                if (country == null)
                {
                    return BadRequest();
                }
                else
                {
                    var newCountry = await repository.Insert(country);
                    return CreatedAtAction(nameof(GetCountry),
                    new { id = newCountry.Id }, newCountry);
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new employee record");
            }

        }


        [HttpPut]
        public async Task<IActionResult> UpdateCountry([FromBody] Country country)
        {
            try
            {

                var countryToUpdate = await repository.GetOne(country.Id);

                if (countryToUpdate == null)
                {
                    return NotFound($"Country with Id = {country.Id} not found");
                }
                else
                {

                    await repository.Update(country);
                    return NoContent();
                }

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating employee record");
            }


        }


        [HttpDelete]
        public async Task<IActionResult> DeleteCountry(int Id)
        {
            try
            {
                var countryToDelete = await repository.GetOne(Id);

                if (countryToDelete == null)
                {
                    return NotFound($"Country with Id = {Id} not found");
                }
                await repository.Delete(Id);
                return NoContent();
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting employee record");
            }


        }
    }
}
