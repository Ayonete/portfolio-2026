from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=150)
    description = RichTextUploadingField()
    technologies = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    date_completed = models.DateField()
    featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-date_completed']
    
    def __str__(self):
        return self.title
    
    def get_tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',')]