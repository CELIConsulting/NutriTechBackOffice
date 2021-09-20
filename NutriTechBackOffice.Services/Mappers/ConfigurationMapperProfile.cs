using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using NutriTechBackOffice.Domain.Entities;
using NutriTechBackOffice.Services.Planes.Forms;
using NutriTechBackOffice.Services.Users.Forms;

namespace NutriTechBackOffice.Services.Users.Automapper
{
    public class ConfigurationMapperProfile : Profile
    {
        public ConfigurationMapperProfile()
        {
            CreateMap<InsertUserForm, Paciente>()
                 .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                 .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
                 .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                 .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                 .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol));

            CreateMap<InsertUserForm, Administrador>()
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol));

            CreateMap<InsertUserForm, Nutricionista>()
           .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
           .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
           .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
           .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol));

            CreateMap<InsertPlanForm, PlanAlimentacion>()
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.Tipo, opt => opt.MapFrom(src => src.Tipo))
                .ForMember(dest => dest.Almuerzo, opt => opt.MapFrom(src => src.Almuerzo))
                .ForMember(dest => dest.CantAguaDiaria, opt => opt.MapFrom(src => src.CantAguaDiaria))
                .ForMember(dest => dest.CantColacionesDiarias, opt => opt.MapFrom(src => src.CantColacionesDiarias))
                .ForMember(dest => dest.Cena, opt => opt.MapFrom(src => src.Cena))
                .ForMember(dest => dest.Colacion, opt => opt.MapFrom(src => src.Colacion))
                .ForMember(dest => dest.Desayuno, opt => opt.MapFrom(src => src.Desayuno))
                .ForMember(dest => dest.Merienda, opt => opt.MapFrom(src => src.Merienda));

        }
    }
}
