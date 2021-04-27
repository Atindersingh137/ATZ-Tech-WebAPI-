using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ATZ_Tech_WebAPI_.Models
{
    public class Product
    {
        //product primary key
        [Key]
        public int Id { get; set; }

        //product name
        public string Name { get; set; }

        //product price
        public string Price { get; set; }

        //product desc
        public string Description { get; set; }

      
    }
}
