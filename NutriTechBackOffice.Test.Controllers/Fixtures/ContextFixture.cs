using NutriTechBackOffice.Test.Controllers.Mock.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Test.Controllers.fixtures
{
    class ContextFixture : IDisposable
    {
        private TestDbContextMock testDbContextMock;

        public ContextFixture()
        {
            testDbContextMock = new TestDbContextMock();

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);

        }
        ~ContextFixture()
        {
            Dispose(false);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                // free managed resources
                if (testDbContextMock != null)
                {
                    testDbContextMock.Dispose();
                    testDbContextMock = null;
                }
            }
        }
    }
}
