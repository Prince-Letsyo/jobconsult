from rest_framework.generics import (
     DestroyAPIView)
from Utils.permissions import (IsSectorOwner, )

from user.models import (Sector)
from user.serializers.user_serializers_fields import (SectorSerializer)

class SectorDestroyAPIView(DestroyAPIView):
    serializer_class = SectorSerializer
    permission_classes = [IsSectorOwner,]
    queryset = Sector.objects.all()
    lookup_field = 'id'
