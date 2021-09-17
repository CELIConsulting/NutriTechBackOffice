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
        GetUsersQuery _queryUser = new GetUsersQuery();
        GetUsersHandler _getUsersHandler= new GetUsersHandler();

        public UserControllerTest(FirestoreTestFixture fixture)
        {
            this._fixture = fixture;
            this.mediatrMock = new Mock<IMediator>();
        }

        [Fact]
        public async Task GetAllUsers()
        {
            _getUsersHandler = new GetUsersHandler();
            CancellationToken _cancellationToken = new CancellationToken();
            var result = await _getUsersHandler.Handle(_queryUser, _cancellationToken);
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task InsertUser()
        {
            mediatrMock.Setup(m => m.Send(It.IsAny<InsertUserCommand>(), It.IsAny<CancellationToken>()));
            _userController = new UserController(mediatrMock.Object);
            var insertForm = new InsertUserForm() {
                Nombre = "prueba lu",
                Apellido = "oliva",
                Email = "TestInsertLu@gmail.com",
                Password ="hola1234",
                Rol = new Role()
                {
                    Nombre = "admin",
                    Descripcion = "admin que te borra la base en produccion porque estaba armando tests a la madrugada"
                }
            };
            InsertUserCommand _insertComand = new InsertUserCommand(insertForm);
            CancellationToken _cancellationToken = new CancellationToken();
            InserUserCommandHandler _insertUser = new InserUserCommandHandler();
            var result = await _insertUser.Handle(_insertComand, _cancellationToken);
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task GetUserById_retunsNotNull()
        {
            GetUserByIdHandler _userById = new GetUserByIdHandler();
            CancellationToken _cancellationToken = new CancellationToken();
            GetUserByIdQuery _queryUser = new GetUserByIdQuery("lu.com");
            var result = await _userById.Handle(_queryUser,_cancellationToken);
            result.Should().NotBeNull();
        }
    }
}
