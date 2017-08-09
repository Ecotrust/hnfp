from django.db import models
from django.contrib.auth.models import User, Group
from drawing.models import AOI as drawing_AOI
from features.registry import register
from django.contrib.contenttypes.fields import GenericForeignKey
from django.core.exceptions import ValidationError
from django.core.urlresolvers import reverse
from django.utils import timezone
from ckeditor.fields import RichTextField

# Create your models here.
@register
class AOI(drawing_AOI):

	class Options:
		verbose_name = 'Area of Interest'
		icon_url = 'hnfp/img/aoi.png'
		export_png = False
		manipulators = []
		# optional_manipulators = ['clipping.manipulators.ClipToShoreManipulator']
		optional_manipulators = []
		form = 'drawing.forms.AOIForm'
		# form_template = 'aoi/form.html'
		form_template = 'hnfp/aoi/form.html'
		show_template = 'aoi/show.html'

# blog posts for forum
class PublicManager(models.Manager):
	def get_queryset(self):
		return super(PublicManager, self).get_queryset()\
										 .filter(publish__lte=timezone.now())

class Post(models.Model):
	STATUS_CHOICES = (
		('draft', 'Draft'),
		('published', 'Published'),
	)
	title = models.CharField(max_length=250)
	slug = models.SlugField(max_length=250, unique_for_date='publish')
	body = models.TextField()
	allow_comments = models.BooleanField('allow comments', default=True)
	publish = models.DateTimeField(default=timezone.now)
	objects = PublicManager()  # Our custom manager.

	class Meta:
		ordering = ('-publish',)

	def __str__(self):
		return self.title

	def get_absolute_url(self):
		return reverse('post-detail',
					   kwargs={'year': self.publish.year,
							   'month': self.publish.strftime('%b'),
							   'day': self.publish.strftime('%d'),
							   'slug': self.slug})

# registration survey
class Survey(models.Model):
	name = models.CharField(max_length=400)
	description = models.TextField()

	def __unicode__(self):
		return (self.name)

	def questions(self):
		if self.pk:
			return Question.objects.filter(survey=self.pk)
		else:
			return None

class Category(models.Model):
	name = models.CharField(max_length=400)
	survey = models.ForeignKey(Survey)

	def __unicode__(self):
		return (self.name)

def validate_list(value):
	'''takes a text value and verifies that there is at least one comma '''
	values = value.split(',')
	if len(values) < 2:
		raise ValidationError("The selected field requires an associated list of choices. Choices must contain more than one item.")

class Question(models.Model):
	TEXT = 'text'
	RADIO = 'radio'
	SELECT = 'select'
	SELECT_MULTIPLE = 'select-multiple'
	INTEGER = 'integer'

	QUESTION_TYPES = (
		(TEXT, 'text'),
		(RADIO, 'radio'),
		(SELECT, 'select'),
		(SELECT_MULTIPLE, 'Select Multiple'),
		(INTEGER, 'integer'),
	)

	text = models.TextField()
	required = models.BooleanField()
	category = models.ForeignKey(Category, blank=True, null=True,)
	survey = models.ForeignKey(Survey)
	question_type = models.CharField(max_length=200, choices=QUESTION_TYPES, default=TEXT)
	# the choices field is only used if the question type
	choices = models.TextField(blank=True, null=True,
		help_text='if the question type is "radio," "select," or "select multiple" provide a comma-separated list of options for this question .')

	def save(self, *args, **kwargs):
		if (self.question_type == Question.RADIO or self.question_type == Question.SELECT
			or self.question_type == Question.SELECT_MULTIPLE):
			validate_list(self.choices)
		super(Question, self).save(*args, **kwargs)

	def get_choices(self):
		''' parse the choices field and return a tuple formatted appropriately
		for the 'choices' argument of a form widget.'''
		choices = self.choices.split(',')
		choices_list = []
		for c in choices:
			c = c.strip()
			choices_list.append((c,c))
		choices_tuple = tuple(choices_list)
		return choices_tuple

	def __unicode__(self):
		return (self.text)

class Response(models.Model):
	# a response object is just a collection of questions and answers with a
	# unique interview uuid
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	survey = models.ForeignKey(Survey)
	interviewer = models.CharField('Name of Interviewer', max_length=400)
	interviewee = models.CharField('Name of Interviewee', max_length=400)
	conditions = models.TextField('Conditions during interview', blank=True, null=True)
	comments = models.TextField('Any additional Comments', blank=True, null=True)
	interview_uuid = models.CharField("Interview unique identifier", max_length=36)

	def __unicode__(self):
		return ("response %s" % self.interview_uuid)

class AnswerBase(models.Model):
	question = models.ForeignKey(Question)
	response = models.ForeignKey(Response)
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

# these type-specific answer models use a text field to allow for flexible
# field sizes depending on the actual question this answer corresponds to. any
# "required" attribute will be enforced by the form.
class AnswerText(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerRadio(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerSelect(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerSelectMultiple(AnswerBase):
	body = models.TextField(blank=True, null=True)

class AnswerInteger(AnswerBase):
	body = models.IntegerField(blank=True, null=True)

# Job Postings
class JobOpportunity(models.Model):
	title = models.CharField(max_length=400)
	posted = models.DateTimeField(auto_now_add=True)
	description = RichTextField(blank=True, null=True, config_name="custom") #ckeditor
	is_html = models.BooleanField(default=False, help_text='Use HTML editor')
	html_content = models.TextField(blank=True, null=True, help_text='html if use html == True')
	jop_post_doc = models.FileField(blank=True, upload_to='job-post/')

	class Meta:
		verbose_name_plural = 'Job Opportunities'

	def __unicode__(self):
		return unicode("%s" % (self.page))

	def __str__(self):
		return self.title

# observations
class ObservationLocation(models.Model):
	name = models.CharField(max_length=400)
	latlng = models.CharField(max_length=60)

class ObservationCategory(models.Model):
	observation_category = models.CharField(max_length=400)

class Observation(models.Model):
	category = models.ForeignKey(ObservationCategory, blank=True, null=True,)
	customcategory = models.CharField(max_length=400)
	observation_date = models.DateTimeField()
	observation_type = models.CharField(max_length=400)
	observation_tally = models.IntegerField(blank=True, null=True)
	observation_created = models.DateTimeField(auto_now_add=True)
	observation_updated = models.DateTimeField(auto_now=True)
	number_of_observers = models.IntegerField(blank=True, null=True)
	observation_photo = models.ImageField()
	observers = models.CharField(max_length=800)
	location = models.ForeignKey(ObservationLocation, blank=True, null=True,)
	comments = models.CharField(max_length=1600)

	class Meta:
		verbose_name_plural = 'Observations'

	def save(self, *args, **kwargs):
		super(Observation, self).save(*args, **kwargs)

	def __unicode__(self):
		return unicode("%s" % (self.page))

	def __str__(self):
		return self.observers
