from django.db import models
from drawing.models import AOI as drawing_AOI
from features.registry import register

# Create your models here.
@register
class AOI(drawing_AOI):

    class Options:
        verbose_name = 'Area of Interest'
        icon_url = 'marco/img/aoi.png'
        export_png = False
        manipulators = []
        # optional_manipulators = ['clipping.manipulators.ClipToShoreManipulator']
        optional_manipulators = []
        form = 'drawing.forms.AOIForm'
        # form_template = 'aoi/form.html'
        form_template = 'hnfp/aoi/form.html'
        show_template = 'aoi/show.html'
