using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs.AuthDTOs
{
    public class LoginUserDTO
    {
        public string LoginId { get; set; }
        public string Password { get; set; }
    }
}
