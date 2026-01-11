from .models import Project
from django.contrib import admin

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'date_completed', 'featured']
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ['category', 'featured', 'date_completed']
    search_fields = ['title', 'description']