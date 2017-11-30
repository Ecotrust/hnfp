from django.contrib import admin
from django.contrib.gis import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from features.registry import register
from hnfp.models import Post, PublicManager, Question, Category, Survey, SurveyResults, AnswerText, AnswerRadio, AnswerSelect, AnswerInteger, AnswerSelectMultiple, AOI, JobOpportunity, Observation, Alert, LandUseProject, Resource, ImpactType, ProjectResourceImpact

# Blog posts for forum
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'publish', 'allow_comments')
    list_filter = ('publish',)
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'publish'
    ordering = ['publish']
    fieldsets = ((None,
                  {'fields': ('title', 'slug', 'body',
                              'allow_comments', 'publish',)}),)

# Register your models here.
class QuestionInline(admin.TabularInline):
	model = Question
	ordering = ('category',)
	extra = 0

class CategoryInline(admin.TabularInline):
	model = Category
	extra = 0

class SurveyAdmin(admin.ModelAdmin):
	inlines = [CategoryInline, QuestionInline]

class AnswerBaseInline(admin.StackedInline):
	fields = ('question', 'body')
	readonly_fields = ('question',)
	extra = 0

class AnswerTextInline(AnswerBaseInline):
	model= AnswerText

class AnswerRadioInline(AnswerBaseInline):
	model= AnswerRadio

class AnswerSelectInline(AnswerBaseInline):
	model= AnswerSelect

class AnswerSelectMultipleInline(AnswerBaseInline):
	model= AnswerSelectMultiple

class AnswerIntegerInline(AnswerBaseInline):
	model= AnswerInteger

class ResponseAdmin(admin.ModelAdmin):
	list_display = ('interview_uuid', 'interviewer', 'created')
	inlines = [AnswerTextInline, AnswerRadioInline, AnswerSelectInline, AnswerSelectMultipleInline, AnswerIntegerInline]
	# specifies the order as well as which fields to act on
	readonly_fields = ('survey', 'created', 'updated', 'interview_uuid')

class ObservationAdmin(admin.OSMGeoAdmin):
	list_display = ('category', 'observer_username', 'observation_date')
	readonly_fields = ('observation_created', 'observation_updated')

class AlertAdmin(admin.OSMGeoAdmin):
	list_display = ('alert_type', 'alert_username', 'alert_date')
	readonly_fields = ('alert_created', 'alert_updated')

class LandUseProjectAdmin(admin.OSMGeoAdmin):
	list_display = ('name', 'category', 'start_date', 'completion_date', 'published', 'username', 'share_with_land_managers')
	readonly_fields = ('created', 'updated')

# admin.site.register(Question, QuestionInline)
# admin.site.register(Category, CategoryInline)
admin.site.register(Survey, SurveyAdmin)
# admin.site.register(Response, ResponseAdmin)
admin.site.register(JobOpportunity)
admin.site.register(Observation, ObservationAdmin)
admin.site.register(Alert, AlertAdmin)
admin.site.register(LandUseProject, LandUseProjectAdmin)
admin.site.register(Resource)
admin.site.register(ImpactType)
admin.site.register(ProjectResourceImpact)
admin.site.register(SurveyResults)
