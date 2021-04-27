using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ATZ_Tech_WebAPI_.Models;

namespace ATZ_Tech_WebAPI_.Data
{
    public class ATZ_Tech_WebAPI_Context : DbContext
    {
        public ATZ_Tech_WebAPI_Context (DbContextOptions<ATZ_Tech_WebAPI_Context> options)
            : base(options)
        {
        }

        public DbSet<ATZ_Tech_WebAPI_.Models.Product> Product { get; set; }
    }
}
