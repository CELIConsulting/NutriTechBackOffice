using AutoMapper;
using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
using MediatR;
using NutriTechBackOffice.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace NutriTechBackOffice.Services.Planes.Commands
{
    public class DeletePlanCommandHandler : IRequestHandler<DeletePlanCommand, bool>
    {
        private CollectionReference _PlanRef;
        private IMapper _mapper;
        private DocumentSnapshot _Plan;
        private readonly FirebaseAuth _firebaseAuth;


        public DeletePlanCommandHandler(FirestoreDb firestore, IMapper mapper)
        {
            _PlanRef = firestore.Collection("Planes");
            _mapper = mapper;

        }

        public async Task<bool> Handle(DeletePlanCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _Plan = await _PlanRef.Document(request.Nombre).GetSnapshotAsync();
                if (_Plan.Exists)
                {
                    await _PlanRef.Document(request.Nombre).DeleteAsync();
                    return true;

                }
                else
                {
                    return false;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
