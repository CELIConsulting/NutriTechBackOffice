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
            //Paciente
            CreateMap<InsertUserForm, Paciente>()
                 .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                 .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
                 .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                 .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol))
                .ForMember(dest => dest.FechaNacimiento, opt => opt.MapFrom(src => src.FechaNacimiento))
                .ForMember(dest => dest.Telefono, opt => opt.MapFrom(src => src.Telefono));

            CreateMap<UpdatePatientForm, Paciente>()
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol))
                .ForMember(dest => dest.FechaNacimiento, opt => opt.MapFrom(src => src.FechaNacimiento))
                .ForMember(dest => dest.Telefono, opt => opt.MapFrom(src => src.Telefono))
                .ForMember(dest => dest.Altura, opt => opt.MapFrom(src => src.Altura))
                .ForMember(dest => dest.Peso, opt => opt.MapFrom(src => src.Peso))
                .ForMember(dest => dest.MedidaCintura, opt => opt.MapFrom(src => src.MedidaCintura))
                .ForMember(dest => dest.TipoAlimentacion, opt => opt.MapFrom(src => src.TipoAlimentacion))
                .ForMember(dest => dest.PlanAsignado, opt => opt.MapFrom(src => src.PlanAsignado));

            //Administrador
            CreateMap<InsertUserForm, Administrador>()
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol))
                .ForMember(dest => dest.FechaNacimiento, opt => opt.MapFrom(src => src.FechaNacimiento))
                .ForMember(dest => dest.Telefono, opt => opt.MapFrom(src => src.Telefono));

            //Nutricionista
            CreateMap<InsertUserForm, Nutricionista>()
           .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
           .ForMember(dest => dest.Apellido, opt => opt.MapFrom(src => src.Apellido))
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
           .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Rol, opt => opt.MapFrom(src => src.Rol))
                .ForMember(dest => dest.FechaNacimiento, opt => opt.MapFrom(src => src.FechaNacimiento))
                .ForMember(dest => dest.Telefono, opt => opt.MapFrom(src => src.Telefono));

            //Plan de Alimentación
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
