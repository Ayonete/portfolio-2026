from .models import Project, Category
from django.contrib import admin

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['display_name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'date_completed', 'featured']
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ['categories', 'featured', 'date_completed']
    search_fields = ['title', 'description']
    filter_horizontal = ['categories']