using Fleet_Service.dto.request;
using Fleet_Service.Models;

namespace Fleet_Service.Mappers
{
    public static class ContainerMapper
    {

        //public static ContainerResponse MapToResponse(ContainerRequest request)
        //{
        //    return new ContainerResponse
        //    {
        //        // Map properties from request to response
        //    };
        //}

        public static Container MapToContainer(ContainerRequest request)
        {
            return new Container
            {
                ContainerNumber = request.ContainerNumber,
                IsoCode = request.IsoCode,
                ContainerType = request.ContainerType,
                SizeFt = request.SizeFt,
                MaxWeightKg = request.MaxWeightKg,
                TareWeightKg = request.TareWeightKg,
                Status = request.Status,
                OwnerCompany = request.OwnerCompany,
                Color = request.Color,
                Images = request.Images,
                ManufactureDate = request.ManufactureDate,
                InspectionExpiry = request.InspectionExpiry
            };
        }
    }
}
