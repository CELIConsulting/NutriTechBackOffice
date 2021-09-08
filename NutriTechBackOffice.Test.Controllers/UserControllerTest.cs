using NutriTechBackOffice.Controllers;
using NutriTechBackOffice.Services;
using NutriTechBackOffice.Test.Controllers.Fixtures;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Sdk;
using Moq;
using NutriTechBackOffice.Services.Users.Queries;
using MediatR;
using FluentAssertions;
using NutriTechBackOffice.Domain.Entities;
using System.Threading;
using NutriTechBackOffice.Services.Users.Commands;
using NutriTechBackOffice.Services.Users.Forms;

namespace NutriTechBackOffice.Test.Controllers
{
    public class UserControllerTest : IClassFixture<FirestoreTestFixture>
    {
        private readonly FirestoreTestFixture _fixture;
        private readonly FirestoreHelper _context;
        private readonly Mock<IMediator> mediatrMock;


        UserController _userController;

        public UserControllerTest(FirestoreTestFixture fixture)
        {
            this._fixture = fixture;
            this.mediatrMock = new Mock<IMediator>();
        }

        [Fact]
        public async Task GetAllUsers()
        {
            mediatrMock.Setup(m => m.Send(It.IsAny<GetUsersQuery>(), It.IsAny<CancellationToken>()));
            _userController = new UserController(mediatrMock.Object);
            var result = _userController.GetUsers();
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task InsertUser()
        {
            mediatrMock.Setup(m => m.Send(It.IsAny<InsertUserCommand>(), It.IsAny<CancellationToken>()));
            _userController = new UserController(mediatrMock.Object);
            var insertForm = new InsertUserForm() { 
                Nombre = "prueba ivan",
                Apellido = "hribernik",
                Email = "algo@gmail.com",
                Password ="hola1234",
                Rol = new Role()
                {
                    Nombre = "admin",
                    Descripcion = "admin que te borra la base en produccion porque estaba armando tests a la madrugada"
                }
            };
            var result = _userController.PostAsync(insertForm);
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task GetUserById_retunsNotNull()
        {
            mediatrMock.Setup(m => m.Send(It.IsAny<GetUserByIdQuery>(), It.IsAny<CancellationToken>()));
            _userController = new UserController(mediatrMock.Object);
            var result = _userController.Get("pepe");
            result.Should().NotBeNull();
        }
    }
}
