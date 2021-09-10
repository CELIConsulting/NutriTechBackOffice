using Google.Api.Gax;
using Google.Cloud.Firestore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace NutriTechBackOffice.Test.Controllers.Fixtures
{
    public class FirestoreTestFixture
    {
        public FirestoreTestFixture()
        {
            Configuration = CreateConfiguration();
            DB = CreateDbInstance();
            Clean(DB.Collection("Users"));
            Clean(DB.Collection("Roles"));
        }
        public FirestoreDb DB { get; }
        public IConfiguration Configuration { get; }

        private FirestoreDb CreateDbInstance()
        {
            return new FirestoreDbBuilder
            {
                ProjectId = Configuration["project_id"],
                EmulatorDetection = EmulatorDetection.EmulatorOnly
            }.Build();
        }

        private IConfiguration CreateConfiguration()
        {
            return new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true)
                .AddJsonFile(Environment.ExpandEnvironmentVariables(Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS")), true)
                .AddEnvironmentVariables()
                .AddUserSecrets<FirestoreTestFixture>()
                .Build();
        }
        private void Clean(CollectionReference collection)
        {
            var snapShot = collection.GetSnapshotAsync().GetAwaiter().GetResult();
            foreach (var doc in snapShot.Documents)
            {
                doc.Reference.DeleteAsync().GetAwaiter().GetResult();
            }
        }
    }
}
