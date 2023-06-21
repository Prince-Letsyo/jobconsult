from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView)
from Utils.permissions import IsSeeker
from user.models import (Seeker)
from user.serializers import (SeekerSerializer)


class SeekerListCreateAPIView(ListCreateAPIView):
    serializer_class = SeekerSerializer
    queryset = Seeker.objects.all()


class SeekerDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = SeekerSerializer
    permission_classes = [IsSeeker,]
    queryset = Seeker.objects.all()
    lookup_field = 'user'
