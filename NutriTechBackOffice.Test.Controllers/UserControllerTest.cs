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
using Google.Cloud.Firestore;

namespace NutriTechBackOffice.Test.Controllers
{
    public class UserControllerTest : IClassFixture<FirestoreTestFixture>
    {
        private readonly FirestoreTestFixture _fixture;
        private readonly Mock<IMediator> mediatrMock;
        private readonly Mock<FirestoreDb> firebaseMock;
        private GetUsersQuery _queryUser;
        private GetUsersHandler _getUsersHandler;

        public UserControllerTest(FirestoreTestFixture fixture)
        {
            this._fixture = fixture;
            this.mediatrMock = new Mock<IMediator>();
            this.firebaseMock = new Mock<FirestoreDb>();
            _queryUser = new GetUsersQuery();
            _getUsersHandler = new GetUsersHandler(firebaseMock.Object);
        }

        [Fact]
        public async Task GetAllUsers()
        {
            _getUsersHandler = new GetUsersHandler(this.firebaseMock.Object);
            CancellationToken _cancellationToken = new CancellationToken();
            var result = await _getUsersHandler.Handle(_queryUser, _cancellationToken);
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task InsertUser()
        {
            mediatrMock.Setup(m => m.Send(It.IsAny<InsertUserCommand>(), It.IsAny<CancellationToken>()));
            var insertForm = new InsertUserForm()
            {
                Nombre = "prueba lu",
                Apellido = "oliva",
                Email = "TestInsertLu@gmail.com",
                Password = "hola1234",
                Rol = new Role()
                {
                    Nombre = "admin",
                    Descripcion = "admin que te borra la base en produccion porque estaba armando tests a la madrugada"
                }
            };
            InsertUserCommand _insertComand = new InsertUserCommand(insertForm);
            CancellationToken _cancellationToken = new CancellationToken();
            InserUserCommandHandler _insertUser = new InserUserCommandHandler(this.firebaseMock.Object);
            var result = await _insertUser.Handle(_insertComand, _cancellationToken);
            result.Should().NotBeNull();
        }

        [Fact]
        public async Task GetUserById_retunsNotNull()
        {
            GetUserByIdHandler _userById = new GetUserByIdHandler(this.firebaseMock.Object);
            CancellationToken _cancellationToken = new CancellationToken();
            GetUserByIdQuery _queryUser = new GetUserByIdQuery("lu.com");
            var result = await _userById.Handle(_queryUser,_cancellationToken);
            result.Should().NotBeNull();
        }
    }
}
