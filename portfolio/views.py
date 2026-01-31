from django.shortcuts import render, get_object_or_404
from .models import Project, Category

def home(request):
    return render(request, 'home.html')

def projects(request):
    category_slug = request.GET.get('category')

    if category_slug:
        projects_list = Project.objects.filter(categories__slug=category_slug).distinct()
    else:
        projects_list = Project.objects.all()

    selected_project = projects_list.first() if projects_list.exists() else None

    # Get all categories for the filter buttons
    categories = Category.objects.all()

    return render(request, 'portfolio/projects.html', {
        'projects': projects_list,
        'selected_project': selected_project,
        'categories': categories,
        'active_category': category_slug,
    })

def project_detail_partial(request, slug):
    project = get_object_or_404(Project, slug=slug)
    category_slug = request.GET.get('category')

    if request.htmx:
        return render(request, 'portfolio/partials/project_detail.html', {
            'selected_project': project
        })

    if category_slug:
        projects_list = Project.objects.filter(categories__slug=category_slug).distinct()
    else:
        projects_list = Project.objects.all()

    return render(request, 'portfolio/projects.html', {
        'projects': projects_list,
        'selected_project': project,
        'categories': Category.objects.all(),
        'active_category': category_slug,
    })