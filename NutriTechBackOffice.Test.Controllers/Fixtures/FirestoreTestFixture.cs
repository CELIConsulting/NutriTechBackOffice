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
            // si si lo se esto esta horrible pero bueno no se me ocurrio de otra manera
            string filepath = @"C:\Users\ivan_\.ssh\service-account-file.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);
            Environment.SetEnvironmentVariable("FIRESTORE_EMULATOR_HOST", "localhost:8080");
            DB = CreateDbInstance();
            Clean(DB.Collection("Users"));
            Clean(DB.Collection("Roles"));

        }
        public FirestoreDb DB { get; }
        public IConfiguration Configuration { get; } = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", true)
        .AddJsonFile(@"C:\Users\ivan_\.ssh\service-account-file.json", true)
        .AddEnvironmentVariables()
        .AddUserSecrets<FirestoreTestFixture>()
        .Build();

        private FirestoreDb CreateDbInstance()
        {
            return new FirestoreDbBuilder
            {
                ProjectId = Configuration["project_id"],
                EmulatorDetection = EmulatorDetection.EmulatorOnly
            }.Build();
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
