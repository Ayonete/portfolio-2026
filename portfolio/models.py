from django.db import models
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web-dev', 'Web Development'),
        ('ui-ux', 'UI/UX Design'),
        ('cloud', 'Cloud & DevOps'),
        ('game-dev', 'Game Development'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='web-dev')
    short_description = models.CharField(max_length=150)
    description = RichTextUploadingField()
    technologies = models.CharField(max_length=200)  # Comma-separated
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    project_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    date_completed = models.DateField()
    featured = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-date_completed']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    def get_tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',')]
    
    def get_category_display_name(self):
        return dict(self.CATEGORY_CHOICES).get(self.category, self.category)