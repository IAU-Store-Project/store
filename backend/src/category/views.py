from django.shortcuts import render, redirect
from category.forms import NewCategoryForm
from category.models import Category


def categories(request):
    categories = Category.objects.all()
    context = {"title": "Kategoriler", "categories": categories}
    return render(request, 'categories.html', context=context)


def new_category(request):
    form = NewCategoryForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('/categories/')
    context = {"title": "Kategori Oluştur", 'form': form}
    return render(request, 'category_new.html', context=context)
