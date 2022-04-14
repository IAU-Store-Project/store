from django.shortcuts import render, redirect
from category.forms import NewCategoryForm
from category.models import Category
from django.views.generic import ListView


class CategoryListView(ListView):
    model = Category
    queryset = Category.objects.all().order_by('-id')
    context_object_name = 'categories'
    template_name = 'categories.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Kategoriler'
        return context


# Detail View




# def categories(request):
#     categories = Category.objects.all()
#     context = {"title": "Kategoriler", "categories": categories}
#     return render(request, 'categories.html', context=context)


# Create View

def new_category(request):
    form = NewCategoryForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('/categories/')
    context = {"title": "Kategori Oluştur", 'form': form}
    return render(request, 'category_new.html', context=context)
