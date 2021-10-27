using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Text;

namespace NutriTechBackOffice.Services.Users.Helpers
{
    public static class SerializedUserHelper
    {
        private static bool ConvertTimeStampToDateTime(object fechaNacTimestamp, out DateTime fechaNacDate)
        {
            string timeStampString;
            char[] separators = new char[] { ':', 'T' };

            timeStampString = fechaNacTimestamp?.ToString();
            var dateString = timeStampString.Split(separators, StringSplitOptions.RemoveEmptyEntries)[1].Trim();

            DateTimeOffset fechaNotUTC;

            if (DateTimeOffset.TryParse(dateString, out fechaNotUTC))
            {
                fechaNacDate = fechaNotUTC.UtcDateTime;
                return true;
            }

            fechaNacDate = DateTime.UtcNow;
            return false;
        }

        public static Dictionary<string, object> GetUser(DocumentSnapshot userDoc)
        {
            Dictionary<string, object> user = userDoc.ToDictionary();
            object fechNacValue;

            if (user.TryGetValue("FechaNacimiento", out fechNacValue) && fechNacValue != null)
            {
                DateTime fechaNac;

                if (ConvertTimeStampToDateTime(fechNacValue, out fechaNac))
                {
                    user.Remove("FechaNacimiento");
                    user.Add("FechaNacimiento", fechaNac);
                }
            }

            return user;
        }

    }
}
