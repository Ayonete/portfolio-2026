from django.shortcuts import render, get_object_or_404
from .models import Project

def home(request):
    return render(request, 'home.html')

def projects(request):
    projects = Project.objects.all()
    selected_project = projects.first() if projects.exists() else None
    return render(request, 'portfolio/projects.html', {
        'projects': projects,
        'selected_project': selected_project
    })

def project_detail_partial(request, slug):
    project = get_object_or_404(Project, slug=slug)
    if request.htmx:
        return render(request, 'portfolio/partials/project_detail.html', {'selected_project': project})
    return render(request, 'portfolio/projects.html', {
        'projects': Project.objects.all(),
        'selected_project': project
    })